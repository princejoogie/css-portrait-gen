import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import { handleAnalytics } from "../utils/helpers";
import { Container } from "./Container";

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 z-50 w-full bg-blue-800 border-t border-gray-700">
      <Container className="flex flex-col items-center justify-between py-2 space-y-2 text-sm lg:flex-row lg-space-y-0">
        <p>
          {"Made with <3 by "}
          <a
            onClick={() => handleAnalytics("LINK_PORTFOLIO")}
            href="https://princecaarlo.tech"
            target="_blank"
            className="text-blue-300"
          >
            Prince Carlo Juguilon
          </a>
          {" :3"}
        </p>

        <div className="flex space-x-4">
          <a
            onClick={() => handleAnalytics("LINK_GITHUB")}
            href="https://github.com/princejoogie/"
            target="_blank"
          >
            <AiFillGithub className="text-xl text-gray-300" />
          </a>
          <a
            onClick={() => handleAnalytics("LINK_INSTAGRAM")}
            href="https://www.instagram.com/princecaarlo/"
            target="_blank"
          >
            <AiFillInstagram className="text-xl text-gray-300" />
          </a>
          <a
            onClick={() => handleAnalytics("LINK_LINKEDIN")}
            href="https://www.linkedin.com/in/princejoogie/"
            target="_blank"
          >
            <AiFillLinkedin className="text-xl text-gray-300" />
          </a>
        </div>

        <p>All Right Reserved &copy; 2021</p>
      </Container>
    </footer>
  );
};
