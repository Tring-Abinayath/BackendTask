export type getCourseMaterialArgsType = {
    c_id: string, 
    bucket: string,
    pageSize:number,
    page:number,
    courseMaterialName:string
}

export type addCourseMaterialArgsType = {
    c_id: string,
    c_mat_upload: string
}

export type updateCourseMaterialArgsType = {
    c_mat_id: string,
    c_id: string,
    c_mat_newUpload: string
}

export type deleteCourseMaterialArgsType = {
    c_mat_id: string,
    c_id: string
}

export type isMaterialArgsType={
    c_mat_id: string, 
    c_id: string
}
