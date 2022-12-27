import React from "react";

interface IProps {}

const Home: React.FC<IProps> = () => {
    return (
        <>
            <h1 className="text-3xl font-bold underline  text-center">
                Hello world!
            </h1>
        </>
    );
};

export default Home;
