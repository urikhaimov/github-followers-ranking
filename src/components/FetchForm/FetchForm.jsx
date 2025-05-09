
import React, { useContext } from 'react';
import { Input } from '../../ui/Input';
import './style.css';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';


const FetchForm = () => {
    const {handleSubmit, onSubmit,register} = useContext(DashboardContext)
    return (<form method='post' onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className='controls'>
            <Input label={'GitHub Username'} register={register} name={'username'} placeholder={'Enter GitHub username'} />
            <Input label={'Traversal Depth (e.g. 1 or 2)'} register={register} name={'depth'} placeholder={'Enter Depth'} type="number" />
            <button type='submit'>Fetch</button>
        </div>


    </form>)
}

export default FetchForm;