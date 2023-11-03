import React, { useEffect, useState } from 'react'
import * as yup from 'yup'


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}
 
// 👇 Here you will create your schema.
const formSchema= yup.object().shape({
  fullName: yup.string()
  .trim() 
  .min(3,validationErrors.fullNameTooShort)
  .max(20,validationErrors.fullNameTooLong),
  size: yup.string()
  .oneOf(['S', 'M', 'L'], 'size must be S or M or L'),
  Pepperoni: yup.string(), 
  'Green Peppers': yup.string(), 
  Pineapple: yup.string(),
  Mushrooms: yup.string(), 
  Ham: yup.string()

  
})



// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]
const initialFormValue = {
  fullName: '', 
  size: '', 
  Pepperoni: false, 
  'Green Peppers': false,
  Pinapple: false, 
  Mushrooms: false, 
  Ham: false,
}
const initialFormErrors = {
  fullName: '', 
  size: '', 

}







export default function Form() {
  const [ formValues, setFormValues ] = useState(initialFormValue)
  const [ formErrors, setFormErrors ] = useState(initialFormErrors)
  
  const [submit, setSubmit] = useState(false)
  const [success, setSuccess] = useState('')
  const [failure, setFailure] = useState('') 

  useEffect(() => {
    // console.log(formValues)
    formSchema.isValid(formValues).then(setSubmit)
    
  }, [formValues])

  const onChange = evt => {
    let { type, name, checked, value } = evt.target
    if (type == 'checkbox') value = checked
    // console.log( name );
    // console.log (value );
    setFormValues({ ...formValues, [name]: value })
    yup.reach(formSchema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => {
        // console.log(err)
        // console.log(err.errors)
        if ( err.errors ) {
           setFormErrors({ ...formErrors, [name]: err.errors[0] })
        }
      })
  } 
  
 
  


  const onSubmit = evt => {
    evt.preventDefault()
    
    let count = 0;
    formValues.Pepperoni && count++;
    formValues['Green Peppers' ] && count++;
    formValues.Pineapple && count++;
    formValues.Mushrooms && count++;
    formValues.Ham && count++;



  //  const successString = count ? 'My string with toppings' : 'my string without toppings'
    
    
    let successString = '';
    if ( count === 0 ) {
      successString = 'with no toppings'
    } else if ( count >= 1 ) {
      successString = `with ${count} toppings`
    } 
    
    let pizzaSize = '';
    if(formValues.size === 'S'){
      pizzaSize = 'Your small pizza'
    }
    else if
    (formValues.size === 'M'){
      pizzaSize = 'Your medium pizza'
    }
    else
    {
      pizzaSize = 'Your large pizza'
    }
 
    

    setSuccess(`Thank you for your order, ${formValues.fullName}! ${pizzaSize} ${successString} is on the way.`);
    setFormValues(initialFormValue)
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>{failure}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input name = 'fullName' id = 'fullName' onChange={onChange} value={formValues.fullName} placeholder="Type full name"  type="text" />
        </div>
        {formErrors.fullName && <div className='error'>{formErrors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" name= 'size' onChange={onChange} value={ formValues.size } >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div> 
        {formErrors.size && <div className='error'>{formErrors.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        { toppings.map( (topping) => (
          <label key={ topping.topping_id } name= 'toppings' onChange={onChange}>
          <input
            name={ topping.text }
            type="checkbox"
            checked={ formValues[topping.text] }
            onChange={onChange}
          />
          {topping.text}<br />
        </label>
        ))}
        {/* <label key="1">
          <input
            name="Pepperoni"
            type="checkbox"
          />
          Pepperoni<br />
        </label>
        <label key="2">
          <input
            name="Green Peppers"
            type="checkbox"
          />
          Green Peppers<br />
        </label>
        <label key="3">
          <input
            name="Pineapple"
            type="checkbox"
          />
          Pineapple<br />
        </label>
        <label key="4">
          <input
            name="Mushrooms"
            type="checkbox"
          />
          Mushrooms<br />
        </label>
        <label key="5">
          <input
            name="Ham"
            type="checkbox"
          />
          Ham<br />
        </label> */}
        
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input  type="submit" disabled={!submit} />
    </form>
  )
}
