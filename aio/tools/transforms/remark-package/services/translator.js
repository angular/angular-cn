function mark(text) {
  return text.replace(/<(h\d|header|p|a)(\b[\s\S]*?)>([\s\S]+?)<\/\1>/gi, function ($0, $1, $2, $3) {
    const suffix = isTranslation($3) ? 'result' : 'origin=off';
    return `<${$1} translation-${suffix} ${$2}>${$3}</${$1}>`;
  });
}

function swap(text) {
  return text.replace(/<(\w+)( translation-origin\b[\s\S]*?)<\/\1>(\s*)<\1( translation-result\b[\s\S]*?)<\/\1>/gi, '<$1$4</$1>$3<$1$2</$1>');
}

function markAndSwap(text) {
  return swap(mark(text));
}

function isTranslation(text) {
  return text && /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/.test(text);
}

module.exports = {
  mark,
  swap,
  markAndSwap,
};
