const Footer = () => {
    return (
        <footer className="bg-background py-4 mt-auto border   text-black ">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;  