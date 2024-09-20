import { Check, X } from 'lucide-react'
import React from 'react'

const PasswordCriteria = ({password}) => {
    const criteria = [
        {label:"At least 6 characters ", met:password.length>=6},
        {label:"Contains uppercase letters ", met:/[A-Z]/.test(password)},
        {label:"Contains lowercase letters ", met:/[a-z]/.test(password)},
        {label:"Contains a number ", met:/\d/.test(password)},
        {label:"Contains a special character ", met:/[^A-Za-z0-9]/.test(password)},  
    ]

    return(
        <div className='mt-2 space-y-1'>
            {criteria.map((item, index)=>(
                <div key={item.label} className='flex items-center text-xs'>
                    {item.met ? (
                        <Check className='size-4 text-green-500 mr-2'/>
                    ):(
                        <X className='size-4 text-red-500 mr-2'/>
                    )} 
                    <span className={ item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
                </div>
            ))}

        </div>
    )
}

const PasswordStrengthMeter = ({password}) => {

    const getStrength = () => {
        let strength =0;
        if(password.length>=6){
            strength++;
        }
        if(password.match(/[A-Z]/) && password.match(/[a-z]/)){
            strength++;
        }
        if(password.match(/\d/)){
            strength++;
        }
        if(password.match(/[^a-zA-Z\d]/)){
            strength++;
        }
        return strength;
    }

    const strength = getStrength(password);

    const getColor = (strength) => {
        if(strength==0){
            return "bg-red-500";
        }else if(strength==1){
            return "bg-red-400";
        }else if(strength==2){
            return "bg-yellow-500";
        }else if(strength==3){
            return "bg-yellow-400";
        }else{
            return "bg-green-500";
        }
    }

    const getStrengthText = (strength) =>{
        if(strength==0){
            return "Very Weak";
        }else if(strength==1){
            return "Weak";
        }else if(strength==2){
            return "Fair";
        }else if(strength==3){
            return "Good";
        }else{
            return "Strong";
        }
    }

  return (
    <div className='mt-2'>
        <div className='flex justify-center items-center mb-1'>
            <span className='text-xs text-gray-400 mr-1'> Password Strength : </span>
            <span className='text-xs text-gray-400 '> {getStrengthText(strength)}</span>
        </div>
        <div className='flex space-x-1'>
            {[...Array(4)].map((_,index)=>(
                <div
                key={index}
                className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                    ${index<strength ? getColor(strength) : "bg-gray-600"}
                    `}
                />
            ))}
        </div>
        <PasswordCriteria password={password}/>
    </div>
  )
}

export default PasswordStrengthMeter