import Image from "next/image";
import styles from "../styles/components/queries.module.css";
import logo from "../assets/logo.png";
import email from "../assets/icons/email.svg";
import { useState } from "react";
import { useEffect } from "react";
import ViewQuery from "./viewQuery";
import ReplyQuery from "./replyQuery";

export default function Queries(props) {
  const { data } = props;
  const [viewQuery, setViewQuery] = useState(false);
  const [replyQuery, setReplyQuery] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState({});
  const [fillUPArray, setFillUpArray] = useState([]);
  const fillUp = () => {
    var array = [];
    if (data.length < 12) {
      for (var i = 0; i < 12 - data.length; i++) {
        array.push({
          "First Name": "",
          "Last Name": "",
          "Query Number": "",
          "Query Source": "",
          "Query Type": "",
          Subject: "",
          "Phone number": "",
          Emails: "",
          Location: "",
          Status: "",
          Comments: "",
        });
      }
    }
    setFillUpArray(array);
  };

  useEffect(() => {
    fillUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Queries - New, In progress, Resolved</div>
      <section className={styles.table__container}>
        <table className={styles.table}>
          <thead style={{ backgroundColor: "#CCCCCC" }}>
            <tr className={styles.table__head}>
              <td>Name</td>
              <td className={styles.table__cell}>Ticket Number</td>
              <td className={styles.table__cell}>Address</td>
              <td className={styles.table__cell}>Email</td>
              <td className={styles.table__cell}>Phone Number</td>
              <td className={styles.table__cell}>Comments</td>
              <td className={styles.table__cell}>Attachments</td>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              return (
                <tr
                  className={styles.table__row}
                  key={index}
                  style={{
                    backgroundColor: index % 2 ? "white" : "#DDDDDD",
                  }}
                  onClick={() => {
                    setSelectedQuery(row);
                    setViewQuery(true);
                  }}
                >
                  <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                  <td className={styles.table__cell}>{row["Query Number"]}</td>
                  <td className={styles.table__cell}>{row["Location"]}</td>
                  <td className={styles.table__cell}>{row["Emails"]}</td>
                  <td className={styles.table__cell}>{row["Phone number"]}</td>
                  <td className={styles.table__cell}>comments</td>
                  <td className={styles.table__cell}>Attachments</td>
                </tr>
              );
            })}
            {fillUPArray.map((row, index) => {
              return (
                <tr
                  className="table__row"
                  key={index}
                  style={{ backgroundColor: index % 2 ? "#DDDDDD" : "white" }}
                >
                  <td>{`${row["First Name"]} ${row["Last Name"]}`}</td>
                  <td className={styles.table__cell}>{row["Query Number"]}</td>
                  <td className={styles.table__cell}>{row["Location"]}</td>
                  <td className={styles.table__cell}>{row["Emails"]}</td>
                  <td className={styles.table__cell}>{row["Phone number"]}</td>
                  <td className={styles.table__cell}></td>
                  <td className={styles.table__cell}></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <div className={styles.pagination}>
        <button
          className={styles.back}
          style={{
            backgroundColor: "#6FA8DC",
            width: "4em",
            borderLeft: "2px solid black",
          }}
        >
          {"<<"}
        </button>
        <button className={styles.back}>{"<"}</button>
      </div>
      {viewQuery && (
        <ViewQuery
          setViewQuery={setViewQuery}
          data={selectedQuery}
          setReplyQuery={setReplyQuery}
        />
      )}
      {replyQuery && (
        <ReplyQuery data={selectedQuery} setReplyQuery={setReplyQuery} />
      )}
    </div>
  );
}
