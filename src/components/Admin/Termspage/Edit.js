import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import Parser from "html-react-parser";
import copy from "copy-to-clipboard";
import parse from "html-react-parser";
// import { CopyToClipboard } from 'react-copy-to-clipboard';

function Edit() {
  let history = useHistory();
  const [Aboutus, setAboutus] = useState("");
  const [AboutusEdit, setAboutusEdit] = useState("");
  const [Exchange, setExchange] = useState("");
  const [ExchangeEdit, setExchangeEdit] = useState("");
  const [TermsCondition, setTermsCondition] = useState("");
  const [TermsConditionEdit, setTermsConditionEdit] = useState("");
  const [TermsArray, setTermsArray] = useState("");
  const [disable, setdisable] = useState(false);

  var iTermsId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  const [Gif, setGif] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    var p = convertToRaw(editorState.getCurrentContent());
    setAboutus(draftToHtml(p));
  }, [editorState]);

  //  *********************EXCHANE***************************

  const [editorState1, setEditorState1] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    var p = convertToRaw(editorState1.getCurrentContent());
    setExchange(draftToHtml(p));
  }, [editorState1]);

  //  *********************Tearms And Condition ***************************
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    var p = convertToRaw(editorState2.getCurrentContent());
    setTermsCondition(draftToHtml(p));
  }, [editorState2]);

  // ***************************************************************************

  function termssavedata() {
    const fd = new FormData();
    fd.append("Aboutus", Aboutus);
    fd.append("Exchange", Exchange);
    fd.append("TermsCondition", TermsCondition);
    fd.append("iTermsId", iTermsId);

    if (Aboutus) {
      setGif(true);
      var answer = window.location.href;
      const answer_array = answer.split("/");

      if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/pramesh/backend/api/terms_page_save_data";
      } else {
        var url =
          "https://prameshsilks.com/backend/api/terms_page_save_data";
      }
      const dataa = axios
        .post(url, fd)
        .then((res) => {
          setdisable(true);

          if (res.data.Status == "0") {
            setdisable(true);

            setGif(false);
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(function () {
              history.push("/admin/terms/listing");
            }, 2000);
          } else {
            setdisable(false);

            toast.error(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {});
    }
  }
  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/pramesh/backend/api/all_terms_get?iTermsId=${iTermsId}`;
  } else {
    var urls = `https://prameshsilks.com/backend/api/all_terms_get?iTermsId=${iTermsId}`;
  }

  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setAboutusEdit(res.data.tAboutus);
        setExchangeEdit(res.data.tExchange);
        setTermsConditionEdit(res.data.tTermsCondition);
      })
      .catch((err) => {});
  }, []);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const copyToClipboard0 = (e) => {
    var copyright0 = document.querySelector(".copyright0");
    copy(copyright0.innerText);
  };
  const copyToClipboard1 = (e) => {
    var copyright1 = document.querySelector(".copyright1");
    copy(copyright1.innerText);
  };
  const copyToClipboard2 = (e) => {
    var copyright2 = document.querySelector(".copyright2");
    copy(copyright2.innerText);
  };

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Header />
        <div className="container-fluid overflow-hidden">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Terms Page </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted ">
                      Terms Page information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="termBtn">
                              <label>About us Page Content</label>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={copyToClipboard0}
                              >
                                Copy
                              </button>
                            </div>

                            <div
                              style={{ display: "block" }}
                              className="copyright0"
                              dangerouslySetInnerHTML={{ __html: AboutusEdit }}
                            ></div>

                            <div
                              style={{ display: "none" }}
                              className="copyright1"
                              dangerouslySetInnerHTML={{ __html: ExchangeEdit }}
                            ></div>

                            <div
                              style={{ display: "none" }}
                              className="copyright2"
                              dangerouslySetInnerHTML={{
                                __html: TermsConditionEdit,
                              }}
                            ></div>

                            <div
                              style={{
                                border: "1px solid black",
                                padding: "2px",
                                minHeight: "400px",
                              }}
                            >
                              <Editor
                                onEditorStateChange={setEditorState}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                              />

                              {/* <Editor
                                                                editorState={editorState}
                                                                onEditorStateChange={handleEditorChange}
                                                                wrapperClassName="wrapper-class"
                                                                editorClassName="editor-class"
                                                                toolbarClassName="toolbar-class"
                                                            /> */}
                            </div>
                            <br></br>
                            <div className="termBtn">
                              <label>Returns-Exchanges</label>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={copyToClipboard1}
                              >
                                Copy
                              </button>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                padding: "2px",
                                minHeight: "400px",
                              }}
                            >
                              <Editor
                                editorState={editorState1}
                                onEditorStateChange={setEditorState1}
                              />
                            </div>
                            <br></br>

                            <div className="termBtn">
                              <label>Terms And Conditions</label>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={copyToClipboard2}
                              >
                                Copy
                              </button>
                            </div>
                            <div
                              style={{
                                border: "1px solid black",
                                padding: "2px",
                                minHeight: "400px",
                              }}
                            >
                              <Editor
                                editorState={editorState2}
                                onEditorStateChange={setEditorState2}
                              />
                            </div>
                            <br></br>

                            <button
                              type="button"
                              onClick={termssavedata}
                              className={`btn btn-primary ${
                                disable ? "disabled" : ""
                              }`}
                            >
                              {Gif == true ? (
                                <img
                                  className="loding_gif"
                                  src={process.env.PUBLIC_URL + "/Images/3.svg"}
                                  alt="img"
                                />
                              ) : (
                                <>Submit</>
                              )}
                            </button>
                            <Link to="/admin/terms/listing">
                              <a>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                >
                                  Back
                                </button>
                              </a>
                            </Link>
                          </div>
                          <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
