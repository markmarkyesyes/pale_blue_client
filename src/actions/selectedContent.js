export const SELECT_CONTENT = "SELECT_CONTENT",
             CLOSE_CONTENT = "CLOSE_CONTENT";

export function selectContent(data) {
  console.log('selecting');
  return {
   type: SELECT_CONTENT,
   data
  };
}

export function closeContent() {
  console.log('closing');
  return {
   type: CLOSE_CONTENT,
  };
}
