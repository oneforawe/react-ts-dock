interface ObjectWithMessage {
  message: unknown; // the "sub-message" of the object
}

// hasSubMessage = hasMessageProperty
function hasSubMessage (obj: object): obj is ObjectWithMessage {
  return 'message' in obj;
}

export function getPossibleSubMessageString (x: unknown): string {
  let messageString = '';
  if (
    x !== null &&
    typeof x === 'object' &&
    hasSubMessage(x)
  ) {
    const possibleMessageString = x.message;
    if (typeof possibleMessageString === 'string') {
      messageString = possibleMessageString;
    }
  }
  return messageString;
}
