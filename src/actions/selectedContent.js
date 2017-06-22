export const SELECT_CONTENT = "SELECT_CONTENT",
             CLOSE_CONTENT = "CLOSE_CONTENT";

export function selectContent(data) {
  return {
   type: SELECT_CONTENT,
   data
  };
}

export function closeContent() {
  return {
   type: CLOSE_CONTENT,
  };
}
