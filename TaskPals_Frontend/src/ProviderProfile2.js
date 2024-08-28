function ProviderProfile2(){
    return(
        <>
            <div className="container text-center">
            <div className="row">
            <div className="col-lg bg-danger-subtle m-1 rounded mb-5">
             <img src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg" alt="profile_pic" className="rounded-circle img-thumbnail m-2"></img>
             <div>
                <strong className="fs-1">Jane Doe</strong>
             </div>
             <h5 className="fw-light text-danger">Painter</h5>
             <br />
             <i className="fa-solid fa-quote-left fa-2xl" style={{ color: 'goldenrod'}}></i>
             <div className="lh-1">
             <p className="text-center fw-medium m-2">Painting is just another way of keeping a diary.</p>
             <figcaption className="fw-lighter">-ChatGBT</figcaption>
             </div>
             <br />
             <div className="p-3 rounded" style={{background: 'lightcoral'}}>
             <h3 className="m-2 fw-medium text-start">My Rating</h3>
             <div className="p-3">
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             <i className="fa-solid fa-star fa-xl m-1" style={{color: 'gold'}}></i>
             </div>
             <h6 className="fw-lighter">TaskPalsVerified <i className="fa-regular fa-circle-check"></i></h6>
             
             </div>
             <br />
            </div>
            <div className="col-lg m-1">
            <div className="row">
                <div className="col-12 bg-danger-subtle rounded">
                <h2 className="m-3 fw-medium text-start">Bio</h2>
                <p className="text-center m-2 fw-light mb-4">Hi, I'm Jane Doe, a passionate painter with years of experience bringing spaces to life with color and creativity. Whether it's adding a fresh coat to your living room, creating a custom mural, or touching up details, I take pride in delivering high-quality work with attention to detail and professionalism.</p>
                </div>
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2 className="m-3 fw-medium text-start">Contact Me</h2>
            <a class="btn disabled placeholder col-7 border m-2" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-solid fa-phone"></i> (929) 309 4786</a>
            <a class="btn disabled placeholder col-7 border m-1" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-solid fa-envelope"></i> janedoe@painters.net</a>
            <a class="btn disabled placeholder col-7 border m-2" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-brands fa-facebook"></i> JaneDoePaint</a>
            <a className="btn disabled placeholder col-7 border m-1 mb-3" aria-disabled="true" style={{background: 'lightcoral'}}><i className="fa-brands fa-instagram"></i> @janethepainter</a>
            </div>
            
            <div className="col-12 bg-danger-subtle mt-2 rounded">
            <h2 className="fw-medium text-start m-3">Experience</h2>
            <div className="progress m-4" role="progressbar">
                <div className="progress-bar w-25" style={{background: 'lightcoral'}}>4 Years</div>
            </div>
                <p className="m-3 fw-light">Jane has 4 years of experience in being a painter!</p>
            </div>
            </div>
            </div>
            <div className="col-lg bg-danger-subtle m-1 mb-5 rounded">
            <h2 className="fw-medium text-start m-3">Goals</h2>
                <ul className="m-3 text-start list-unstyled">
                    <li><i className="fa-solid fa-circle fa-xs" style={{color: 'lightcoral'}}></i> I aim to learn and master new painting techniques and finishes, such as faux finishes or eco-friendly painting methods, to offer a broader range of services to my clients.</li><br />
                    <li><i className="fa-solid fa-circle fa-xs" style={{color: 'lightcoral'}}></i> I want to expand my client base by focusing on delivering high-quality work, gaining referrals, and building strong relationships with homeowners, contractors, and real estate agents.</li><br />
                    <li><i className="fa-solid fa-circle fa-xs" style={{color: 'lightcoral'}}></i> Streamline my work processes to complete projects more quickly without compromising quality, allowing me to take on more jobs and increase my earnings.</li><br />
                    <li><i className="fa-solid fa-circle fa-xs" style={{color: 'lightcoral'}}></i> Incorporate more eco-friendly practices and materials into my work to meet growing demand for environmentally conscious options and reduce my business's impact on the environment.</li><br />
                </ul>
                <button className="btn" style={{backgroundColor: 'lightcoral'}}>Book Me</button>
            </div>
            </div>
            </div>

        </>
        
    )
}

export default ProviderProfile2;

    // years of experience
