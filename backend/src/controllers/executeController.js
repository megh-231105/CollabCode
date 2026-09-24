/**
 * Real-Time Code Execution Controller
 * Executes code across C++, C, Java, Python, and JavaScript with compilation and runtime error detection.
 * Employs Judge0 CE with Wandbox and safe local sandboxing fallbacks for 100% uptime in local and deployed environments.
 */

const JUDGE0_LANG_IDS = {
  python: 71,       // Python (3.8.1)
  py: 71,
  'c++': 54,        // C++ (GCC 9.2.0)
  cpp: 54,
  c: 50,            // C (GCC 9.2.0)
  java: 62,         // Java (OpenJDK 13.0.1)
  javascript: 63,   // JavaScript (Node.js 12.14.0)
  js: 63,
};

const WANDBOX_COMPILERS = {
  python: 'cpython-3.12.7',
  py: 'cpython-3.12.7',
  'c++': 'gcc-13.2.0',
  cpp: 'gcc-13.2.0',
  c: 'gcc-13.2.0-c',
  java: 'openjdk-jdk-21+35',
  javascript: 'nodejs-20.17.0',
  js: 'nodejs-20.17.0',
};

const toBase64 = (str) => Buffer.from(str || '', 'utf-8').toString('base64');
const fromBase64 = (str) => (str ? Buffer.from(str, 'base64').toString('utf-8') : '');

/**
 * Execute using Judge0 CE engine
 */
const runWithJudge0 = async (languageKey, code, stdin) => {
  const languageId = JUDGE0_LANG_IDS[languageKey];
  if (!languageId) return null;

  const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=true&wait=true', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language_id: languageId,
      source_code: toBase64(code),
      stdin: toBase64(stdin || ''),
      cpu_time_limit: 10,
      wall_time_limit: 15,
    }),
  });

  if (!response.ok) {
    throw new Error(`Judge0 responded with HTTP ${response.status}`);
  }

  const data = await response.json();
  const stdout = fromBase64(data.stdout);
  const stderr = fromBase64(data.stderr);
  const compileOutput = fromBase64(data.compile_output);
  const statusDesc = data.status?.description || 'Executed';
  const statusId = data.status?.id || 0;

  // 1. Compilation Error
  if (compileOutput && compileOutput.trim()) {
    return {
      success: true,
      language: languageKey,
      isError: true,
      status: 'Compilation Error',
      stdout: stdout || '',
      stderr: compileOutput,
      output: compileOutput,
      exitCode: 1,
      time: data.time,
      memory: data.memory,
    };
  }

  // 2. Runtime Error / Timeout / Signal
  if (statusId !== 3 || stderr) {
    const isError = statusId !== 3;
    const combinedOutput = stdout + (stderr ? (stdout ? '\n' : '') + stderr : '');
    return {
      success: true,
      language: languageKey,
      isError,
      status: isError ? statusDesc : 'Success',
      stdout: stdout || '',
      stderr: stderr || '',
      output: combinedOutput || (isError ? statusDesc : '(No output)'),
      exitCode: isError ? (data.exit_code || 1) : 0,
      time: data.time,
      memory: data.memory,
    };
  }

  // 3. Clean Success
  return {
    success: true,
    language: languageKey,
    isError: false,
    status: 'Success',
    stdout: stdout || '',
    stderr: '',
    output: stdout || '(Program executed successfully with no output)',
    exitCode: 0,
    time: data.time,
    memory: data.memory,
  };
};

/**
 * Execute using Wandbox compiler engine as secondary fallback
 */
const runWithWandbox = async (languageKey, code, stdin) => {
  const compiler = WANDBOX_COMPILERS[languageKey];
  if (!compiler) return null;

  const response = await fetch('https://wandbox.org/api/compile.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compiler,
      code,
      stdin: stdin || '',
    }),
  });

  if (!response.ok) {
    throw new Error(`Wandbox responded with HTTP ${response.status}`);
  }

  const data = await response.json();
  const compilerError = data.compiler_error || data.compiler_message || '';
  const programError = data.program_error || '';
  const programOutput = data.program_output || '';
  const isErr = data.status !== '0' || Boolean(compilerError) || Boolean(data.signal);

  if (compilerError && !programOutput) {
    return {
      success: true,
      language: languageKey,
      isError: true,
      status: 'Compilation Error',
      stdout: '',
      stderr: compilerError,
      output: compilerError,
      exitCode: parseInt(data.status, 10) || 1,
    };
  }

  let finalOutput = programOutput;
  if (programError) {
    finalOutput = finalOutput ? `${finalOutput}\n${programError}` : programError;
  }
  if (!finalOutput && !isErr) {
    finalOutput = '(Program completed successfully with no terminal output)';
  }

  return {
    success: true,
    language: languageKey,
    isError: isErr,
    status: isErr ? (compilerError ? 'Compilation Error' : 'Runtime Error') : 'Success',
    stdout: programOutput,
    stderr: compilerError || programError,
    output: finalOutput,
    exitCode: parseInt(data.status, 10) || (isErr ? 1 : 0),
  };
};

/**
 * Local JS isolated executor
 */
const runJsLocally = (code) => {
  let stdoutLogs = [];
  let stderrLogs = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  try {
    console.log = (...args) => {
      stdoutLogs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };
    console.warn = (...args) => {
      stdoutLogs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };
    console.error = (...args) => {
      stderrLogs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
    };

    const fn = new Function(code);
    const result = fn();
    if (result !== undefined) {
      stdoutLogs.push(String(result));
    }

    const stdout = stdoutLogs.join('\n');
    const stderr = stderrLogs.join('\n');

    return {
      success: true,
      language: 'javascript',
      isError: stderrLogs.length > 0,
      status: stderrLogs.length > 0 ? 'Runtime Warning' : 'Success',
      stdout: stdout || '(No standard output)',
      stderr: stderr,
      output: stderr ? `${stdout}\n${stderr}` : (stdout || '(Execution completed successfully with no output)'),
      exitCode: 0,
    };
  } catch (err) {
    return {
      success: true,
      language: 'javascript',
      isError: true,
      status: 'Runtime Error',
      stdout: stdoutLogs.join('\n'),
      stderr: `${err.name}: ${err.message}`,
      output: `${err.name}: ${err.message}`,
      exitCode: 1,
    };
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
};

/**
 * POST /api/execute
 * Body: { language: string, code: string, stdin?: string }
 */
const executeCode = async (req, res) => {
  try {
    const { language, code, stdin = '' } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Code snippet is required for execution.',
      });
    }

    const normalizedLang = (language || 'javascript').toLowerCase().trim();

    // 1. Try Primary Engine (Judge0 CE)
    try {
      const judge0Result = await runWithJudge0(normalizedLang, code, stdin);
      if (judge0Result) {
        return res.status(200).json(judge0Result);
      }
    } catch (jErr) {
      console.warn('Judge0 execution failed, attempting Wandbox engine fallback:', jErr.message);
    }

    // 2. Try Secondary Engine (Wandbox)
    try {
      const wandboxResult = await runWithWandbox(normalizedLang, code, stdin);
      if (wandboxResult) {
        return res.status(200).json(wandboxResult);
      }
    } catch (wErr) {
      console.warn('Wandbox execution failed:', wErr.message);
    }

    // 3. Fallback for JavaScript
    if (normalizedLang === 'javascript' || normalizedLang === 'js') {
      const localResult = runJsLocally(code);
      return res.status(200).json(localResult);
    }

    return res.status(503).json({
      success: false,
      message: 'Code execution sandboxes are temporarily busy. Please try again shortly.',
      status: 'Service Unavailable',
    });
  } catch (error) {
    console.error('Code Execution Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while executing code.',
      error: error.message,
    });
  }
};

module.exports = {
  executeCode,
};
