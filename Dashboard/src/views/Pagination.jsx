import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
function Pagination({currPage,setCurrPage,totalItem,parPage,showItem}){
    let totalPage = Math.ceil(totalItem/parPage);
    let startPage = currPage;
    let dif = totalPage - currPage;

    if(dif <= showItem){
        startPage=totalPage-showItem;
    }
    let endPage = startPage<0?showItem : showItem + startPage;
    if(startPage<=0){
        startPage = 1;
    }

    const createBtn=()=>{
        const btns = [];
        endPage = (endPage>totalPage)?totalPage:endPage;
        for (let i = startPage; i <= endPage; i++) {
            btns.push(
                <li key={i} onClick={e=>setCurrPage(e.target.value)} value={i} className={`${currPage===i?'currPage':'pages'}`} >
                    {i}
                </li>
            )
            
        }
        return btns;
    }
    return(
        <ul style={{display:"flex",gap:"5px",alignItems:"center"}}>
            <li  className="prePage" >{currPage>1 &&<FaCaretSquareLeft onClick={()=>setCurrPage(currPage-1)} />}</li>
            
            {createBtn()}
            <li  className="nextPage" >{currPage<endPage &&<FaCaretSquareRight onClick={()=>setCurrPage(currPage+1)}/>}</li>
        </ul>
    )
}
export default Pagination;