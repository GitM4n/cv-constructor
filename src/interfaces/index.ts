

export type skillLevel =  0 | 1 | 2 | 3 | 4 | 5
export type userTitle = 'username' | 'specialization'
export type contactTitle = 'Phone' | 'Mail' | 'Github' | 'Area'
export type skillTitle = 'Skills' | 'Languages' | 'Other Skills'

export interface IUser {
    name: string,
    specialization:string,
    skills:{
        [key in skillTitle]:{
            title:skillTitle,
            arr:Array<ISkill>
        }
    }
    contacts: Array<IContact>,
    experience:Array<IExperience>
}




export interface ISkill {
    name: string,
    level:skillLevel
}


export interface IContact{
    title:contactTitle,
    text:string,
    icon: string,
    isEdit:boolean
}

export interface IExperience {
    title:string,
    place:string
    startDate:string,
    endDate:string,
    description:string,
    isEdit:boolean

}