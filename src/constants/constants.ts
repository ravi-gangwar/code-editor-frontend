export const token = 'code-editor-token'
export const user = 'code-editor-user'
export const languages = ['Javascript', 'Python', 'Java']

export const codeExample = `// Example code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

export const JavaCodeTemplate = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`
export const Submission = "submission"
export const Execution = "execution"
export const Guest = "guest"


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
