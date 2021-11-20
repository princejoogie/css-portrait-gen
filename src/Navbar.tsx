import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { Container } from "./Container";

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b border-gray-700">
      <Container className="py-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CPG</h1>
          <p className="text-gray-300 text-sm">css portrait generator</p>
        </div>

        <div className="flex space-x-4">
          <a href="https://github.com/princejoogie/" target="_blank">
            <AiFillGithub className="text-gray-300 text-4xl" />
          </a>
          <a href="https://www.instagram.com/princecaarlo/" target="_blank">
            <AiFillInstagram className="text-gray-300 text-4xl" />
          </a>
          <a href="https://www.linkedin.com/in/princejoogie/" target="_blank">
            <AiFillLinkedin className="text-gray-300 text-4xl" />
          </a>
        </div>
      </Container>
    </nav>
  );
};
