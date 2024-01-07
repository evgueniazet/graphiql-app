const prettify = (code: string): string => {
  let result = '';
  let indentLevel = 0;

  const lines = code.split('\n');

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.length === 0) {
      return;
    }

    const openBraceIndex = trimmedLine.indexOf('{');
    const closeBraceIndex = trimmedLine.indexOf('}');

    if (
      closeBraceIndex !== -1 &&
      (openBraceIndex === -1 || closeBraceIndex < openBraceIndex)
    ) {
      indentLevel = Math.max(indentLevel - 1, 0);
    }

    for (let i = 0; i < indentLevel; i++) {
      result += '  ';
    }

    result += trimmedLine;

    if (
      openBraceIndex !== -1 &&
      (closeBraceIndex === -1 || openBraceIndex < closeBraceIndex)
    ) {
      indentLevel++;
    }

    result = result.trim();
    result += '\n';
  });

  result = result.trim();

  return result;
};

export default prettify;
