export const sha256 = async (data: string) => {
    const msgUint8 = new TextEncoder().encode(data) // 문자열을 Uint8Array로 인코딩
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8) // SHA-256 해시 계산
    const hashArray = Array.from(new Uint8Array(hashBuffer)) // 결과를 다시 Uint8Array로 변환
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("") // Uint8Array를 16진수 문자열로 변환
    return hashHex
}
