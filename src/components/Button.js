import Link from "next/link";

function FilledButton(props) {
    return (
        <Link href={props.href}><button className='text-[#0F1221]  bg-[#1CD0EA] px-[2rem] py-[0.5rem] rounded-3xl font-medium hover:bg-white dark:hover:bg-[#0F1221] hover:text-[#1CD0EA] border-2 border-[#1CD0EA]' >{props.title}</button></Link>
    )
}

function EmptyButton(props) {
    return (
        <>
        <Link href={props.href}>
            <button className='px-[2rem] py-[0.5rem] rounded-3xl font-medium bg-white dark:bg-[#0F1221] hover:bg-[#1CD0EA] dark:hover:bg-[#1CD0EA] hover:text-[#0F1221] text-[#1CD0EA] border-2 border-[#1CD0EA]' >{props.title}</button>
        </Link>
        </>)
}


function FilledButtonSm(props) {
    return (
        <Link href={props.href}><button className='text-[#0F1221]  bg-[#1CD0EA] px-[1.2rem] py-[0.2rem] rounded-3xl font-medium text-sm hover:bg-white dark:hover:bg-[#0F1221] hover:text-[#1CD0EA] border-2 border-[#1CD0EA]' >{props.title}</button></Link>
    )
}

export { FilledButtonSm, EmptyButton , FilledButton};