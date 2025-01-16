/**
 * Lexical 에디터의 내용이 비어있는지 확인합니다.
 * 빈 paragraph만 있는 경우도 빈 상태로 간주합니다.
 */
export function isLexicalContentEmpty(content: string): boolean {
  try {
    const parsedContent = JSON.parse(content);

    // root에 아무 노드도 없는 경우
    if (!parsedContent.root.children?.length) {
      return true;
    }

    // paragraph가 하나만 있고, 그 안에 텍스트가 없는 경우
    if (
      parsedContent.root.children.length === 1 &&
      parsedContent.root.children[0].type === 'paragraph' &&
      (!parsedContent.root.children[0].children?.length ||
        !parsedContent.root.children[0].children.some(
          (child: any) => child.type === 'text' && child.text?.trim()
        ))
    ) {
      return true;
    }

    return false;
  } catch {
    // JSON 파싱에 실패하면 빈 상태로 간주
    return true;
  }
}
