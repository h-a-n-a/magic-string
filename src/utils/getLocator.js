export default function getLocator(source) {
	const originalLines = source.split('\n');
	const lineOffsets = [];

	// pos 为当前行的第一个字符在原句中的索引
	for (let i = 0, pos = 0; i < originalLines.length; i++) {
		lineOffsets.push(pos);
		pos += originalLines[i].length + 1;
	}

	return function locate(index) {
		let i = 0;
		let j = lineOffsets.length;
		// 二分查找
		while (i < j) {
			const m = (i + j) >> 1;
			if (index < lineOffsets[m]) {
				j = m;
			} else {
				i = m + 1;
			}
		}
		// 查找当前 index 在哪一行
		const line = i - 1;
		// 查找当前 index 在哪一列
		const column = index - lineOffsets[line];
		return { line, column };
	};
}
