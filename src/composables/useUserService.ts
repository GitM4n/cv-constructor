import {ref} from 'vue'
import type { 
    IUser, 
    skillLevel, 
    IContact,
    skillTitle,
    IExperience
} from '../interfaces'



import emailIcon from '@/icons/emailIcon.png'
import githubIcon from '@/icons/githubIcon.png'
import markerIcon from '@/icons/markerIcon.png'
import phoneIcon from '@/icons/phoneIcon.png'
import standardAvatar from '@/assets/avatar-none.jpg'

const templateUserData = {
    name: 'Your Name',
    specialization: 'Your specialization',
    avatar: standardAvatar,
    skills:{
        'Skills':{
            title:'Skills',
            arr:[
                {
                    name: 'HTML',
                    level: 5
                }
            ]
        },
        'Languages':{
            title:'Languages',
            arr:[
                {
                    name: 'English',
                    level: 1,
                },
                {
                    name: 'Russian',
                    level: 5
                }
            ]
        },
        'Other Skills':{
            title:'Other Skills',
            arr:[]
        }
    },
    contacts:[
        {
            title: 'Phone',
            text: '+7 999 999 99 99',
            icon: phoneIcon,
            isEdit: false
        },
        {
            title: 'Mail',
            text: 'H8Q2H@example.com',
            icon: emailIcon,
            isEdit: false
        },
        {
            title: 'Github',
            text: 'https://github.com/GitM4n',
            icon: githubIcon,
            isEdit: false
        },
        {
            title: 'Area',
            text: 'Russia, St.Petersburg',
            icon: markerIcon,
            isEdit: false
        }
    ],
    experience:[
        {
            title: 'Work Title',
            startDate:'01/01/2020',
            endDate: '01/01/2021',
            place: 'Work Place',
            description: `Work Description. Lorem 
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            isEdit: false
        },
          {
            title: 'Work Title 2',
            startDate:'01/01/2020',
            endDate: '01/01/2021',
            place: 'Work Place 2',
            description: `Work Description 2. Lorem 
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            isEdit: false
        }
    ]
} as IUser


const user = ref<IUser> (sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') as string) : templateUserData)


export const useUserService = () => {


    const setUserNameOrSpecialization = (value:string, title:'username' | 'specialization') => {
        if(value.length === 0){
            title === 'username' ? user.value.name = 'Your Name' : user.value.specialization = 'Your specialization'
            sessionStorage.setItem('user', JSON.stringify(user.value))
            return
        }

        if(value.length > 35){
            value = value.replace(/\s{2,}/g, ' ').slice(0, 35).trim()
        }

        title === 'username' ? user.value.name = value : user.value.specialization = value

        sessionStorage.setItem('user', JSON.stringify(user.value))
    }


    const saveSkill = (name: string, level:skillLevel, title:skillTitle) => {
        if(user.value.skills[title].arr.includes({name, level})){
            alert('Skill already exists')
            return
        }
    
        user.value.skills[title].arr.push({name, level})

        sessionStorage.setItem('user', JSON.stringify(user.value))
    }


    const removeSkill = (idx: number, title:skillTitle) => {
        user.value.skills[title].arr.splice(idx, 1)
        sessionStorage.setItem('user', JSON.stringify(user.value))
    }

    const saveContacts = (obj:IContact) => {
        obj.isEdit = false
        const idx = user.value.contacts.findIndex(item => item.title === obj.title)

        if(obj.title === 'Area') obj.text = obj.text.split(',').join(', ').slice(0, 80).trim()

        if(obj.text.length === 0) obj.text = 'Not specified'

        user.value.contacts[idx] = obj
        sessionStorage.setItem('user', JSON.stringify(user.value))
    }


    const saveExperience = (exp:IExperience, idx:number) => {

        user.value.experience[idx] = exp
        _areAllStringsEmpty(exp) ? user.value.experience.splice(idx, 1) : undefined
        sessionStorage.setItem('user', JSON.stringify(user.value))
    }


    const saveAvatar = (file:File) => {
        const reader = new FileReader()
        reader.onload = () => {
            user.value.avatar = reader.result as string
            console.log(user.value.avatar)
           
        }

        reader.readAsDataURL(file)

       
        sessionStorage.setItem('user', JSON.stringify(user.value))
    }

  
    const addExperience = () => {
        user.value.experience.push( {
            title: '',
            startDate:'',
            endDate: '',
            place: '',
            description: ``,
            isEdit: true
        })
    }





    
    function _areAllStringsEmpty(obj: IExperience): boolean {
        for (let key in obj) {
            if (typeof obj[key as keyof IExperience] === 'string') {

                const value = obj[key as keyof IExperience] as string;
                if (value.trim() !== '') {
                    return false;
                }
            }
        }
        return true;
    }


    

  


    return {
        user,
        setUserNameOrSpecialization,
        saveSkill,
        removeSkill,
        saveContacts,
        saveExperience,
        addExperience,
        saveAvatar
    }
}