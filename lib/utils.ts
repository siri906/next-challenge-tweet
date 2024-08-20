export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  // const formatter= Intl.RelativeTimeFormat("아스키 국가코드")
  // const 시간차이를표현한문장 = formatter.format("숫자","숫자의 단위")

  const formatter = new Intl.RelativeTimeFormat("ko");
  return formatter.format(diff, "days");
}
export function formatToWon(price: number) {
  return Number(price).toLocaleString("ko-KR");
}
