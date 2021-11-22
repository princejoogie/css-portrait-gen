import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { handleAnalytics } from "../utils/helpers";
import { Container } from "./Container";

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b border-gray-700">
      <Container className="flex items-center justify-between py-10">
        <div>
          <h1 className="text-2xl font-bold">CPG</h1>
          <p className="text-sm text-gray-300">css portrait generator</p>
        </div>

        <div className="flex space-x-4">
          <a
            onClick={() => handleAnalytics("LINK_GITHUB")}
            href="https://github.com/princejoogie/css-portrait-gen/"
            target="_blank"
          >
            <AiFillGithub className="text-4xl text-gray-300" />
          </a>
          <a
            onClick={() => handleAnalytics("LINK_INSTAGRAM")}
            href="https://www.instagram.com/princecaarlo/"
            target="_blank"
          >
            <AiFillInstagram className="text-4xl text-gray-300" />
          </a>
          <a
            onClick={() => handleAnalytics("LINK_LINKEDIN")}
            href="https://www.linkedin.com/in/princejoogie/"
            target="_blank"
          >
            <AiFillLinkedin className="text-4xl text-gray-300" />
          </a>
        </div>
      </Container>
    </nav>
  );
};
