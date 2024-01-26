import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

function Add() {
  let history = useHistory();
  const [Aboutus, setAboutus] = useState("");
  const [Exchange, setExchange] = useState("");
  const [TermsCondition, setTermsCondition] = useState("");
  const [disable, setdisable] = useState(false);

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
  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Header />
        <div className="container-fluid">
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
                    <h6 className="heading-small text-muted mb-4">
                      Terms Page information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>About us Page Content</label>
                            <div
                              style={{
                                border: "1px solid black",
                                padding: "2px",
                                minHeight: "400px",
                              }}
                            >
                              <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                              />
                            </div>
                            <br></br>
                            <label>Returns-Exchanges</label>
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

                            <label>Terms And Conditions</label>
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

export default Add;
