import React, { useState, type ChangeEvent } from "react";
import { registerUser } from "../../api/user/user-service";
import { useNavigate } from "react-router-dom";
import { type UserRegisterReuqest } from "../../api/user/requests";
import { useAuth } from "../../context/AuthenticationContext";

type AuthProps = {
    toggleForm: () => void;
};

export function Register({ toggleForm }: AuthProps) {

    const { login } = useAuth();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
 
    const [prefix, setPrefix] = useState("");
    const [phone, setPhone] = useState("");

    const [taxCode, setTaxCode] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("");
    
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    
    const birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const navigate = useNavigate()
    
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      if(password != confirmPassword){
        setMessage("Passwords do not match")
        return 
      }
      
      try {
        const userRegisterRequest: UserRegisterReuqest = {
          userInfo: {
            name:name,
            surname:surname,
            username:email,
            phone:prefix+phone,
            birth_date:birthDate,
            tax_code:taxCode
          },
          userCredentials: {
            username: email,
            password: password
          }
        }
        
        const res = await registerUser(userRegisterRequest);
        login(res.data.jwt_token, res.data.user)

        setMessage("Registration successful! Logging in");
        navigate("/dashboard", {"replace" : true} );
      } catch (err: any) {
        setMessage(err.response?.data?.detail || "Registration failed");
      }
    };

    const handlePrefixChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
    
        // Remove any '+' inside the digits
        value = value.replace(/\+/g, "");
    
        // Keep only first 3 digits
        const digits = value.replace(/\D/g, "").slice(0, 2);
    
        // Always prepend '+'
        setPrefix("+" + digits);
      };

      const handleNumericInputChange = (e: ChangeEvent<HTMLInputElement>, maxInput:number) => {
        // Keep only digits
        const digitsOnly = e.target.value.replace(/\D/g, "");
        const digits = digitsOnly.replace(/\D/g, "").slice(0, maxInput);
        return digits
      };


  
    return (
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="surname"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <div className="flex items-center gap-2">

        <input
          type="prefix"
          placeholder="+39"
          value={prefix}
          onChange={handlePrefixChange}
          className="p-2 border rounded w-[12ch] "
          
          required
        />
        
        <input
          type="phone"
          placeholder="Phone number"
          value={phone}
          onChange={e=> setPhone(handleNumericInputChange(e, 14))}
          className="p-2 border rounded"
          required
        />
        </div>



        <div className="flex items-center gap-2">

        <input
          type="day"
          placeholder="GG"
          value={day}
          onChange={e=> setDay(handleNumericInputChange(e, 2))}
          className="p-2 border rounded w-[8ch] "
          
          required
        />
        
        <input
          type=""
          placeholder="MM"
          value={month}
          onChange={e=> setMonth(handleNumericInputChange(e, 2))}
          className="p-2 border rounded w-[8ch] "
          required
        />
        <input
          type=""
          placeholder="YYYY"
          value={year}
          onChange={e=> setYear(handleNumericInputChange(e, 4))}
          className="p-2 border rounded w-[10ch] "
          required
        />

        <p className="text-m text-white-600">Birth date</p>
        </div>


        <input
        type="tax_code"
        placeholder="TAX CODE"
        value={taxCode}
        onChange={e => setTaxCode(e.target.value)}
        className="p-2 border rounded w-[20ch]"
        required
        />        

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 border rounded w-[36ch]"
          required
        />
         <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="p-2 border rounded w-[36ch]"
          required
        />
<button
  type="submit"
  className="
    inline-block
    bg-green-600 
    text-white 
    p-2 
    rounded 
    hover:bg-green-700 
    focus:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-green-500 
    focus-visible:ring-offset-2
  "
>
  Register
</button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={toggleForm}
          >
            Login
          </button>
        </p>
        {message && <p className="text-red-400">{message}</p>}
      </form>
    );
  }