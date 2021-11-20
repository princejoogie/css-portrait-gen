import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { Container } from "./Container";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 z-50 fixed bottom-0 w-full border-t border-gray-700">
      <Container className="text-sm py-2 flex flex-col lg:flex-row space-y-2 lg-space-y-0 items-center justify-between">
        <p>
          {"Made with <3 by "}
          <a
            href="https://princecaarlo.tech"
            target="_blank"
            className="text-blue-300"
          >
            Prince Carlo Juguilon
          </a>
          {" :3"}
        </p>

        <div className="flex space-x-4">
          <a href="https://github.com/princejoogie/" target="_blank">
            <AiFillGithub className="text-gray-300 text-xl" />
          </a>
          <a href="https://www.instagram.com/princecaarlo/" target="_blank">
            <AiFillInstagram className="text-gray-300 text-xl" />
          </a>
          <a href="https://www.linkedin.com/in/princejoogie/" target="_blank">
            <AiFillLinkedin className="text-gray-300 text-xl" />
          </a>
        </div>

        <p>All Right Reserved &copy; 2021</p>
      </Container>
    </footer>
  );
};
