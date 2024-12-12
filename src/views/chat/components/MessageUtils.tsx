
// export const copyAnswer = async (text : string) => {
//   await navigator.clipboard.writeText(text);
//   alert('답변이 복사되었습니다.')
// }

// export const copyToClipboard = (text: string) => {
//   // 임시 textarea 요소 생성
//   const tempTextarea = document.createElement('textarea');
  
//   // 임시 요소에 복사할 텍스트 할당
//   tempTextarea.value = text;
  
//   // 요소를 화면에 보이지 않도록 스타일 조정
//   tempTextarea.style.position = 'absolute';
//   tempTextarea.style.left = '-9999px';
  
//   // 임시 요소를 문서에 추가
//   document.body.appendChild(tempTextarea);
  
//   // 임시 요소 선택 및 복사
//   tempTextarea.select();
//   document.execCommand('copy');
  
//   // 임시 요소 제거
//   document.body.removeChild(tempTextarea);
// };    


export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    // navigator.clipboard 지원 브라우저 
    navigator.clipboard
      .writeText(text)
      .then(() => alert("복사되었습니다."))
      .catch((err) => alert("복사에 실패했습니다."));
  } else {
    // navigator.clipboard 미지원 브라우저 
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = text;
    tempTextarea.style.position = "absolute";
    tempTextarea.style.left = "-9999px";
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
    alert("복사되었습니다.");
  }
};