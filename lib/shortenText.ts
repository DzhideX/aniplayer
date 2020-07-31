const shortenText = (text: string, textSize: number): string => {
  return text.length <= textSize
    ? text
    : text.substring(0, text.lastIndexOf(" ", textSize)) + "...";
};

export default shortenText;
