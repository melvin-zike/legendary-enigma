import ReactHtmlParser from 'react-html-parser'; 
import { Link } from "react-router-dom";
import "./card.scss";


const Card = ({ desc }) => {
  return (
    <li x-for="item in items" className="post-list">
      <div
        href="item.url"
        className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200"
      >
        <div className="">

          <div>
            <span className="">
              {ReactHtmlParser(desc, {
                replace: (domNode) => {
                  if (domNode.name === "a") {
                    const node = domNode.children[0];
                    return (
                      <Link
                        to={domNode.attribs.href}
                        className={
                          node.data[0] === "#"
                            ? "text-green-400"
                            : "text-blue-400"
                        }
                      >
                        {node.data}
                      </Link>
                    );
                  }
                },
              })}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
