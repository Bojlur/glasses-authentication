
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SocialLogin from './SocialLogin';
import useAuth from '../../hooks/useAuth';

const Register = () => {

    const { createUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm()

    //navigation systems
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';
    
      const onSubmit = (data) => {
        const {email, password} = data
        createUser(email, password)
        .then(result => {
            if(result.user){
                navigate(from)
            }
        });
      }
    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="Full Name" className="input input-bordered"
                                {...register("FullName", { required: true })} />
                                {errors.FullName && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered"
                                {...register("email", { required: true })} />
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input type="text" placeholder="image url" className="input input-bordered"
                                {...register("Image URL")}/>
                                {errors.imageURL && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered"
                                {...register("password", { required: true })} />
                                {errors.password && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <label className="label">
                                Have an account?{" "}
                                <Link to="/login" className="label-text-alt link link-hover">
                                    Please Login
                                </Link>
                            </label>
                            <SocialLogin />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;