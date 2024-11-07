import { getPosts } from "@/lib/actions/post";
import { Post } from "@/types/post";
const getHashColorByTeamName = (team: string) => {
  let hash = 0
  for (let i = 0; i < team.length; i++) {
    hash = team.charCodeAt(i) + (hash << 5) - hash
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).substr(-2)
  }
  console.log(`generate hash color (${color}) for ${team}`)
  return color
}
const getDayName = (day: number) => {
  switch (day) {
    case 0: return "日";
    case 1: return "一";
    case 2: return "二";
    case 3: return "三";
    case 4: return "四";
    case 5: return "五";
    case 6: return "六";
    default: return "未知";
  }
}
interface IDateInfo {
  day: number
  date?: number
  posts?: Post[]
}
const generateDateInfo = async (year: number, month: number) => {
  const postInfo: Post[] = await getPosts(year, month)
  const dateInfo: IDateInfo[] = []
  const getHowManyDate = (year: number, month: number) => {
    switch (month) {
      case 1: return 31;
      case 2:
        // 判断是否是闰年
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          return 29;
        }
        return 28;
      case 3: return 31;
      case 4: return 30;
      case 5: return 31;
      case 6: return 30;
      case 7: return 31;
      case 8: return 31;
      case 9: return 30;
      case 10: return 31;
      case 11: return 30;
      case 12: return 31;
      default: return 30;
    }
  }
  const dateNum = getHowManyDate(year, month);
  const predays = new Date(year, month - 1, 1).getDay();

  for (let i = 0; i < predays; i++)
    dateInfo.push({ day: i });
  for (let i = 1; i <= dateNum; i++) {
    dateInfo.push({
      day: (predays + i) % 7,
      date: i,
      posts: postInfo.filter(v => {
        const d = new Date(v.publishDate)
        return d.getDate() === i
      })
    });
  }
  return dateInfo
}



const Calendar = async () => {
  const dateInfo = await generateDateInfo(new Date().getFullYear(), new Date().getMonth() + 1)

  return (
    <>
      <div className='text-bold text-xl'>本月日历</div>
      <div className=' w-full grid grid-cols-7 grid-rows-5 flex-grow gap-1'>
        {dateInfo.map((v, index) => {

          return (
            <div className={`${v.date ? (v.day > 0 && v.day < 6 ? 'bg-blue-600' : 'bg-blue-800') : 'opacity-0'} rounded-md p-2`} key={index}>
              <div>{getDayName(v.day)}</div>
              <div>{v.date}</div>
              <div className="flex flex-col gap-1">{v.posts?.map((v, index) => {
                
                return (
                  <div key={index} className={`text-sm py-0.5 px-1` }
                    style={{ backgroundColor: getHashColorByTeamName(v.team) }}
                  >
                  <p>{v.title}</p>
                  <p className='bg-black/30 w-fit py-0.5 px-1 rounded-md text-xs'>{v.team}</p>
                  </div>
                )
              })
              }</div>
            </div>
          )
        })}
      </div>
    </>

  )
}

export default Calendar
