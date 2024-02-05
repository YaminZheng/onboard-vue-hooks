class MyError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

export default MyError;
