export function validateTitle(title){
    const titleRegix = /^.{3,40}$/;
    if(titleRegix.test(title.trim())) return true;
    else return false;
}
export function validateDescription(desc){
    const descriptionRegix = /^.{10,}$/;
    if(descriptionRegix.test(desc.trim())) return true;
    else return false;
}
export function validatePrice(price){
    if(price <= 0 ) return false;
    else return true;
}