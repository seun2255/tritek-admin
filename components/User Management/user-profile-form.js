import Image from "next/image";
import styles from "../../styles/components/User Management/user-profile-form.module.css";
import { useState, useEffect } from "react";
import arrow from "../../assets/icons/arrow-black.svg";
import search from "../../assets/icons/search.svg";
import {
  addEmployee,
  editEmployee,
  removeEmployee,
  signUp,
} from "../../pages/api/API";
import axios from "axios";
import clip from "../../assets/icons/clip.svg";
import { Web3Storage } from "web3.storage";
import linkCreator from "../../utils/linkCreator";

var generator = require("generate-password");

export default function UserProfileForm(props) {
  const { mode, data, setEditForm } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState("country");
  const options = ["Germany", "UK", "America", "Japan", "Nigeria", "China"];
  const [menuOpen2, setMenuOpen2] = useState(false);
  const [selected2, setSelected2] = useState("department");
  const departments = ["General", "Admin", "IT", "Sales/Marketing"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [landlinePhone, setLandlinePhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [county, setCounty] = useState("");
  const [country, setCountry] = useState("");
  const [comments, setComments] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);
  const [formState, setFormState] = useState("active");
  const [ticket, setTicket] = useState("");
  const [department, setDepartment] = useState("General");
  const [attachment, setAttachment] = useState("");
  const [fileName, setFileName] = useState("Attach signed NDA *");

  const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN;
  const client = new Web3Storage({ token });

  const handleFileUpload = async (event) => {
    let file = event.target.files[0];
    if (file) {
      const cid = await client.put(event.target.files);
      const url = linkCreator(cid, file.name);
      setAttachment(url);
      setFileName(file.name);
    }
  };

  const handleSave = () => {
    var employee = {
      "First Name": firstName,
      "Last Name": lastName,
      "Phone number": mobilePhone,
      "Landline Phone": landlinePhone,
      Emails: email,
      "Street Address 1": streetAddress1,
      "Street Address 2": streetAddress2,
      City: city,
      Zip: zip,
      County: county,
      Country: country,
      Comments: comments,
      Attachment: attachment,
      Department: department,
    };
    if (mode === "edit") {
      employee["Roles"] = data.Roles || "Admin Staff";
      employee["Employee Number"] = data["Employee Number"] || ticket;
      editEmployee(employee, data["Emails"], data["Phone number"]).then(() => {
        setFormState("edited");
        setTimeout(() => {
          setEditForm(false);
        }, 3000);
      });
    } else {
      employee["Roles"] = "Admin Staff";
      employee["Employee Number"] = ticket;
      addEmployee(employee).then(() => {
        var password = generator.generate({
          length: 8,
          numbers: true,
          symbols: true,
          strict: true,
        });
        signUp(employee.Emails, password).then(() => {
          axios.post("https://tritek-mail.herokuapp.com/api/password-mail", {
            email: employee.Emails,
            password: password,
          });
        });
        setFormState("added");
      });
    }
  };

  const handleDelete = () => {
    if (mode === "edit") {
      removeEmployee(data["Emails"], data["Phone number"]).then(() => {
        setDeleteUser(false);
        setFormState("deleted");
        setTimeout(() => {
          setEditForm(false);
        }, 3000);
      });
    } else {
      setFirstName("");
      setLastName("");
      setMobilePhone("");
      setLandlinePhone("");
      setEmail("");
      setStreetAddress1("");
      setStreetAddress2("");
      setCity("");
      setZip("");
      setCounty("");
      setCountry("");
      setSelected("country");
      setComments("");
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setFirstName(data["First Name"]);
      setLastName(data["Last Name"]);
      setMobilePhone(data["Phone number"]);
      setLandlinePhone(data["Landline Phone"] || "");
      setEmail(data["Emails"]);
      setStreetAddress1(data["Street Address 1"] || "");
      setStreetAddress2(data["Street Address 2"] || "");
      setCity(data["City"] || "");
      setZip(data["Zip"] || "");
      setCounty(data["County"] || "");
      setCountry(data["Country"] || "country");
      setSelected(data["Country"] || "country");
    }
    var temp = generator.generate({
      length: 8,
      numbers: true,
    });
    setTicket(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.outer}>
      {formState === "deleted" && (
        <h1 className={styles.deleted__text} style={{ color: "red" }}>
          The user account has been successfully deleted.
        </h1>
      )}
      {formState === "added" && (
        <h1 className={styles.deleted__text}>
          The user account has been successfully added.
        </h1>
      )}
      {formState === "edited" && (
        <h1 className={styles.deleted__text}>
          The user account has been successfully edited.
        </h1>
      )}
      {formState === "active" && (
        <div className={styles.container}>
          <div className={styles.top__bar}>Candidate Profile Form</div>
          <div className={styles.main}>
            {mode === "edit" && (
              <div
                className={styles.back__button}
                onClick={() => {
                  setEditForm(false);
                }}
              >
                Back
              </div>
            )}
            {mode !== "edit" && <div className={styles.ticket}>{ticket}</div>}
            <main className={styles.form}>
              <div className={styles.fields}>
                <div className={styles.name__box}>
                  <div className={styles.first__name__box}>
                    <label className={styles.first__name__label}>Name*</label>
                    <input
                      className={styles.name__input}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.first__name__box}>
                    <input
                      className={styles.name__input}
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.phone__box}>
                  <div className={styles.phone__container}>
                    <label className={styles.phone__label}>Mobile Phone*</label>
                    <div className={styles.phone__input__container}>
                      <div className={styles.plus__icon}>
                        <Image alt="search icon" layout="fill" src={search} />
                      </div>
                      <input
                        className={styles.phone__input}
                        value={mobilePhone}
                        onChange={(e) => {
                          setMobilePhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.phone__container}>
                    <label className={styles.phone__label}>
                      Landline Phone*
                    </label>
                    <div className={styles.phone__input__container}>
                      <div className={styles.plus__icon}>
                        <Image alt="search icon" layout="fill" src={search} />
                      </div>
                      <input
                        className={styles.phone__input}
                        value={landlinePhone}
                        onChange={(e) => {
                          setLandlinePhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.email__box}>
                  <label className={styles.email__label}>Email*</label>
                  <input
                    className={styles.email__input}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className={styles.address__box}>
                  <label className={styles.address__label}>Address*</label>
                  <input
                    className={styles.address__input}
                    placeholder="Street Address"
                    value={streetAddress1}
                    onChange={(e) => {
                      setStreetAddress1(e.target.value);
                    }}
                  />
                  <input
                    className={styles.address__input}
                    placeholder="Street Address 2"
                    value={streetAddress2}
                    onChange={(e) => {
                      setStreetAddress2(e.target.value);
                    }}
                  />
                  <div className={styles.city__county}>
                    <input
                      className={styles.city__county__input}
                      placeholder="City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <input
                      className={styles.city__county__input}
                      placeholder="County"
                      value={county}
                      onChange={(e) => {
                        setCounty(e.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.zip__country}>
                    <div className={styles.zip__nda__container}>
                      <input
                        className={styles.zipcode__input}
                        placeholder="Postcode/Zipcode"
                        value={zip}
                        onChange={(e) => {
                          setZip(e.target.value);
                        }}
                      />
                      <div className={styles.nda__department__container}>
                        <div className={styles.nda}>
                          <label htmlFor="upload" className={styles.clip}>
                            <Image alt="clip" src={clip} layout="fill" />
                          </label>
                          <input
                            type="file"
                            id="upload"
                            style={{ display: "none" }}
                            onChange={handleFileUpload}
                          />
                          <span
                            style={{
                              fontWeight: 600,
                              width: "90%",
                              overflow: "hidden",
                              overflowX: "clip",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {fileName}
                          </span>
                        </div>
                        <div className={styles.department__dropdown}>
                          <button
                            className={styles.country__dropdown__button}
                            onClick={() => setMenuOpen2(!menuOpen2)}
                          >
                            <span>{selected2}</span>
                            <div className={styles.nda__dropdown__arrow}>
                              <Image
                                alt="arrow"
                                layout="fill"
                                src={arrow}
                                style={{
                                  transform: menuOpen2
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                }}
                              />
                            </div>
                          </button>
                          {menuOpen2 && (
                            <div className={styles.countries__menu}>
                              {departments.map((option, id) => {
                                return (
                                  <div
                                    key={id}
                                    className={styles.country}
                                    onClick={() => {
                                      setSelected2(option);
                                      setMenuOpen2(false);
                                      setDepartment(option);
                                    }}
                                  >
                                    {option}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.country__dropdown}>
                      <button
                        className={styles.country__dropdown__button}
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        <span>{selected}</span>
                        <div className={styles.country__dropdown__arrow}>
                          <Image
                            alt="arrow"
                            layout="fill"
                            src={arrow}
                            style={{
                              transform: menuOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            }}
                          />
                        </div>
                      </button>
                      {menuOpen && (
                        <div className={styles.countries__menu}>
                          {options.map((option, id) => {
                            return (
                              <div
                                key={id}
                                className={styles.country}
                                onClick={() => {
                                  setSelected(option);
                                  setMenuOpen(false);
                                  setCountry(option);
                                }}
                              >
                                {option}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.additional__info}>
                  <label className={styles.additional__info__label}>
                    {"Notes (use for additional information)"}
                  </label>
                  <textarea
                    className={styles.additional__info__input}
                    value={comments}
                    onChange={(e) => {
                      setComments(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className={styles.action__buttons}>
                  <button
                    className={styles.action__button}
                    onClick={handleSave}
                  >
                    save
                  </button>
                  <button
                    className={styles.action__button}
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                </div>
              </div>
            </main>
          </div>
          <div className={styles.bottom__bar}></div>
        </div>
      )}
      {deleteUser && (
        <div className={styles.delete__user__modal}>
          <h3 className={styles.delete__user__text}>
            Are you sure you want to delete this user account?
          </h3>
          <div className={styles.delete__user__buttons}>
            <button
              className={styles.delete__user__button}
              onClick={() => setDeleteUser(false)}
              style={{ backgroundColor: "green" }}
            >
              cancel
            </button>
            <button
              className={styles.delete__user__button}
              onClick={handleDelete}
              style={{ backgroundColor: "red" }}
            >
              continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
