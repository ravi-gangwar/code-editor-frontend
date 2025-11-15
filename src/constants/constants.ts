// ============================================
// LocalStorage Keys
// ============================================
export const token = 'code-editor-token';
export const user = 'code-editor-user';

// ============================================
// API Endpoints
// ============================================
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    SIGNUP: 'auth/signup',
    RESET_PASSWORD: 'auth/resetpassword',
    USER: 'auth/user',
    GOOGLE: 'api/v1/auth/google',
  },
  CODE: {
    EXECUTE: 'code/execute',
    RUN: 'api/v1/code/run',
    SUBMISSIONS: 'code/submissions',
  },
} as const;

// ============================================
// Route Paths
// ============================================
export const ROUTES = {
  HOME: '/',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    CALLBACK: '/auth/callback',
  },
  SANDBOX: '/sandbox',
} as const;

// ============================================
// Execution Types
// ============================================
export const Submission = "submission";
export const Execution = "execution";
export const Guest = "guest";

// ============================================
// Language Configuration
// ============================================
export const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "lua", label: "Lua" },
  { value: "php", label: "PHP" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
] as const;

export const DEFAULT_LANGUAGE = "javascript";

// ============================================
// Default Code Templates
// ============================================
export const DEFAULT_CODE_TEMPLATES: Record<string, string> = {
  javascript: "console.log('Hello, World!');",
  python: "print('Hello, World!')",
  lua: "print('Hello, World!')",
  php: "<?php\necho 'Hello, World!';\n?>",
  c: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
  cpp: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}",
  rust: "fn main() {\n    println!(\"Hello, World!\");\n}",
  go: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
  java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
};

// Legacy code templates (for backward compatibility)
export const codeExample = `// Example code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

export const JavaCodeTemplate = DEFAULT_CODE_TEMPLATES.java;

// Legacy languages array (for backward compatibility)
export const languages = ['Javascript', 'Python', 'Java'];

// ============================================
// Editor Defaults
// ============================================
export const EDITOR_DEFAULTS = {
  ACTIVE_LANGUAGE: "Javascript",
  MULTI_TABS: [
    { name: "index.js", language: "Javascript", content: "console.log('Hello World')" },
    { name: "main.py", language: "Python", content: "print('Hello World')" },
    { name: "MyClass.java", language: "Java", content: JavaCodeTemplate },
  ],
} as const;

// ============================================
// WebSocket Event Names
// ============================================
export enum EventName {
  JoinRoom = "join-room",
  LeaveRoom = "leave-room",
  SendMessage = "send-message",
  CreateRoom = "create-room",
  Error = "error",
  ReceivedMessage = "received-message",
  SetLanguage = "set-language",
  SetOutput = "set-output",
}

// ============================================
// HTTP Headers
// ============================================
export const HTTP_HEADERS = {
  CONTENT_TYPE: "application/json",
  AUTHORIZATION_PREFIX: "Bearer",
} as const;
