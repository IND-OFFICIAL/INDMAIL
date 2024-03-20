import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Mail = (props) => {
  const [time, setTime] = useState();
  const [from, setFrom] = useState();
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();
  const [data, setData] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(5000); // Initial refresh interval of 5 seconds
  const identifier = props.identifier;
  const domain = props.domain;
  const id = props.id;

  const fetchMail = () => {
    axios
      .get(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${identifier}&domain=${domain}&id=${id}`
      )
      .then((res) => {
        if (res.data) {
          let tempdate = new Date(res.data.date);
          setTime(
            new Date(
              Date.UTC(
                tempdate.getFullYear(),
                tempdate.getMonth(),
                tempdate.getDate(),
                tempdate.getHours() - 1,
                tempdate.getMinutes(),
                tempdate.getSeconds()
              )
            ).toLocaleString()
          );
          setFrom(res.data.from);
          setSubject(res.data.subject);
          setBody(res.data.body);
          setData(res.data.attachments);
          // Set refresh interval to 20 seconds if new mail is received
          setRefreshInterval(20000);
        } else {
          // If no mail is received, set refresh interval to 5 seconds
          setRefreshInterval(5000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Fetch mail on component mount
    fetchMail();

    // Set up interval to periodically check for new mail
    const intervalId = setInterval(() => {
      fetchMail();
    }, refreshInterval);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [domain, identifier, id, refreshInterval]);

  return (
    <div className="mx-5 my-2">
      <Card>
        <Card.Body className="mx-2 my-2">
          <Card.Title>{from}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Arrived(IST): {time}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Subject: {subject}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Attachments:
            {data &&
              data.map((data) => {
                return (
                  <div key={data.size}>
                    <a
                      href={`https://www.1secmail.com/api/v1/?action=download&login=${identifier}&domain=${domain}&id=${id}&file=${data.filename}`}
                    >
                      {data.filename}
                    </a>
                  </div>
                );
              })}
          </Card.Subtitle>
          <hr />
          <div
            style={{ overflow: "auto" }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Mail;