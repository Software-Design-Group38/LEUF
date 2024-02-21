import React, {useState} from 'react'
import { useForm } from 'react-hook-form'

const states = [
    { name: "AL", fullName: "Alabama" },
    { name: "AK", fullName: "Alaska" },
    { name: "AZ", fullName: "Arizona" },
    { name: "AR", fullName: "Arkansas" },
    { name: "CA", fullName: "California" },
    { name: "CO", fullName: "Colorado" },
    { name: "CT", fullName: "Connecticut" },
    { name: "DE", fullName: "Delaware" },
    { name: "FL", fullName: "Florida" },
    { name: "GA", fullName: "Georgia" },
    { name: "HI", fullName: "Hawaii" },
    { name: "ID", fullName: "Idaho" },
    { name: "IL", fullName: "Illinois" },
    { name: "IN", fullName: "Indiana" },
    { name: "IA", fullName: "Iowa" },
    { name: "KS", fullName: "Kansas" },
    { name: "KY", fullName: "Kentucky" },
    { name: "LA", fullName: "Louisiana" },
    { name: "ME", fullName: "Maine" },
    { name: "MD", fullName: "Maryland" },
    { name: "MA", fullName: "Massachusetts" },
    { name: "MI", fullName: "Michigan" },
    { name: "MN", fullName: "Minnesota" },
    { name: "MS", fullName: "Mississippi" },
    { name: "MO", fullName: "Missouri" },
    { name: "MT", fullName: "Montana" },
    { name: "NE", fullName: "Nebraska" },
    { name: "NV", fullName: "Nevada" },
    { name: "NH", fullName: "New Hampshire" },
    { name: "NJ", fullName: "New Jersey" },
    { name: "NM", fullName: "New Mexico" },
    { name: "NY", fullName: "New York" },
    { name: "NC", fullName: "North Carolina" },
    { name: "ND", fullName: "North Dakota" },
    { name: "OH", fullName: "Ohio" },
    { name: "OK", fullName: "Oklahoma" },
    { name: "OR", fullName: "Oregon" },
    { name: "PA", fullName: "Pennsylvania" },
    { name: "RI", fullName: "Rhode Island" },
    { name: "SC", fullName: "South Carolina" },
    { name: "SD", fullName: "South Dakota" },
    { name: "TN", fullName: "Tennessee" },
    { name: "TX", fullName: "Texas" },
    { name: "UT", fullName: "Utah" },
    { name: "VT", fullName: "Vermont" },
    { name: "VA", fullName: "Virginia" },
    { name: "WA", fullName: "Washington" },
    { name: "WV", fullName: "West Virginia" },
    { name: "WI", fullName: "Wisconsin" },
    { name: "WY", fullName: "Wyoming" }
  ];

const Profile = () => {
    const {register, handleSubmit, formState: {errors} } = useForm()

    const onSubmit = (data) => {
		console.log(data)
	}

    const [selectedState, setSelectedState] = useState('')

    const handleChange = (e) => {
        const selectedAbbreviation = e.target.value
        setSelectedState(selectedAbbreviation)
      }
  
  return (
    <div class="flex justify-center items-center h-screen">
        <div class="w-96 p-6 shadow-lg bg-white rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 class="text-center">Account Information</h1>
            <div class="mt-3">
                <label for="name" class="block text-base mb-2">Full Name</label>
                <input type="text" id="name" class="border w-full" placeholder="Enter Your Name..." maxLength={50} pattern="[A-Za-z]*" title="Please enter only alphabetical characters" 
                  {...register('name', {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p class="text-xs italic text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div class="mt-3">
                <label for="address1" class="block text-base mb-2">Address 1</label>
                <input type="text" id="address1" class="border w-full" placeholder="Enter Address..." maxLength={100}
                  {...register('address1', {
                    required: "Address is required",
                  })}
                />
                {errors.address1 && (
                  <p class="text-xs italic text-red-500">{errors.address1.message}</p>
                )}
            </div>
            <div class="mt-3">
                <label for="address2" class="block text-base mb-2">Address 2</label>
                <input type="text" id="address1" class="border w-full" placeholder="Enter Address..." maxLength={100}
                  {...register('address2', {
                  })}
                />
                {errors.address2 && (
                  <p class="text-xs italic text-red-500">{errors.address2.message}</p>
                )}
            </div>
            <div class="mt-3">
                <label for="city" class="block text-base mb-2">City</label>
                <input type="text" id="city" class="border w-full" placeholder="Enter City..." maxLength={100}
                  {...register('city', {
                    required: "City is required",
                  })}
                />
                {errors.city && (
                  <p class="text-xs italic text-red-500">{errors.city.message}</p>
                )}
            </div>
            <div class="mt-3">
                <label for="zipcode" class="block text-base mb-2">Zipcode</label>
                <input type="text" id="zipcode" class="border w-full" placeholder="Enter Zipcode..." maxLength={9} pattern="[0-9]*" title="Please enter only numeric characters" 
                  {...register('zipcode', {
                    required: "Zipcode is required",
                    minLength: {
                      value: 5,
                      message: 'Zipcode must be at least 5 characters',
                    }, 
                  })}
                />
                {errors.zipcode && (
                  <p class="text-xs italic text-red-500">{errors.zipcode.message}</p>
                )}
            </div>
            
            <div className="w-full max-w-xs">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <select
                    id="state"
                    name="state"
                    value={selectedState}
                    onChange={handleChange}
                /*    {...register('state', {
                        required: "State is required",
                      })}*/
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                <option value="">Select a state</option>
                {states.map(state => (
                    <option key={state.name} value={state.name}>{state.fullName}</option>
                    ))}
                </select>
                {errors.state && (
                  <p class="text-xs italic text-red-500">{errors.state.message}</p>
                )}
            </div>            
            
            <div class="mt-5">
                <button type="submit" class="w-full rounded-md hover:bg-gray-500 hover:text-white">Submit</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Profile