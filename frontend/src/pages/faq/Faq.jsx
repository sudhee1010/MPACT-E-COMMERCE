import React, { useState } from 'react';
// import Navbar from '../../components/NavbarTwo';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
// import Navbar from '../../components/NavbarTwo';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      category: "PRODUCT INFORMATION",
      questions: [
        { q: "What makes your product unique?", a: "Our products are crafted with premium ingredients, high protein content, and designed to fuel your active lifestyle. Each product undergoes rigorous quality testing to ensure the best taste and nutrition." },
        { q: "What makes your product unique?", a: "We use only natural, high-quality ingredients without any artificial preservatives, ensuring you get the best nutrition in every serving." },
        { q: "What makes your product unique?", a: "Our protein formulations are scientifically designed to provide optimal absorption and sustained energy throughout your day." },
        { q: "What makes your product unique?", a: "All our products are shelf-stable, lactose-free, and recyclable, making them convenient and environmentally friendly." },
        { q: "What makes your product unique?", a: "We combine protein with caffeine for an extra energy boost, perfect for workouts or busy days." }
      ]
    },
    {
      category: "PRODUCT INFORMATION",
      questions: [
        { q: "What makes your product unique?", a: "Our products are crafted with premium ingredients, high protein content, and designed to fuel your active lifestyle. Each product undergoes rigorous quality testing to ensure the best taste and nutrition." },
        { q: "What makes your product unique?", a: "We use only natural, high-quality ingredients without any artificial preservatives, ensuring you get the best nutrition in every serving." },
        { q: "What makes your product unique?", a: "Our protein formulations are scientifically designed to provide optimal absorption and sustained energy throughout your day." },
        { q: "What makes your product unique?", a: "All our products are shelf-stable, lactose-free, and recyclable, making them convenient and environmentally friendly." },
        { q: "What makes your product unique?", a: "We combine protein with caffeine for an extra energy boost, perfect for workouts or busy days." }
      ]
    },
    {
      category: "PRODUCT INFORMATION",
      questions: [
         { q: "What makes your product unique?", a: "Our products are crafted with premium ingredients, high protein content, and designed to fuel your active lifestyle. Each product undergoes rigorous quality testing to ensure the best taste and nutrition." },
        { q: "What makes your product unique?", a: "We use only natural, high-quality ingredients without any artificial preservatives, ensuring you get the best nutrition in every serving." },
        { q: "What makes your product unique?", a: "Our protein formulations are scientifically designed to provide optimal absorption and sustained energy throughout your day." },
        { q: "What makes your product unique?", a: "All our products are shelf-stable, lactose-free, and recyclable, making them convenient and environmentally friendly." },
        { q: "What makes your product unique?", a: "We combine protein with caffeine for an extra energy boost, perfect for workouts or busy days." }
      ]
    },
    {
      category: "PRODUCT INFORMATION",
      questions: [
        { q: "What makes your product unique?", a: "Our products are crafted with premium ingredients, high protein content, and designed to fuel your active lifestyle. Each product undergoes rigorous quality testing to ensure the best taste and nutrition." },
        { q: "What makes your product unique?", a: "We use only natural, high-quality ingredients without any artificial preservatives, ensuring you get the best nutrition in every serving." },
        { q: "What makes your product unique?", a: "Our protein formulations are scientifically designed to provide optimal absorption and sustained energy throughout your day." },
        { q: "What makes your product unique?", a: "All our products are shelf-stable, lactose-free, and recyclable, making them convenient and environmentally friendly." },
        { q: "What makes your product unique?", a: "We combine protein with caffeine for an extra energy boost, perfect for workouts or busy days." }
      ]
    },
    {
      category: "PRODUCT INFORMATION",
      questions: [
         { q: "What makes your product unique?", a: "Our products are crafted with premium ingredients, high protein content, and designed to fuel your active lifestyle. Each product undergoes rigorous quality testing to ensure the best taste and nutrition." },
        { q: "What makes your product unique?", a: "We use only natural, high-quality ingredients without any artificial preservatives, ensuring you get the best nutrition in every serving." },
        { q: "What makes your product unique?", a: "Our protein formulations are scientifically designed to provide optimal absorption and sustained energy throughout your day." },
        { q: "What makes your product unique?", a: "All our products are shelf-stable, lactose-free, and recyclable, making them convenient and environmentally friendly." },
        { q: "What makes your product unique?", a: "We combine protein with caffeine for an extra energy boost, perfect for workouts or busy days." }
      ]
    },
    {
      category: "PRODUCT INFORMATION",
      questions: [
         { q: "What makes your product unique?", a: "Our products are crafted with premium ingredients, high protein content, and designed to fuel your active lifestyle. Each product undergoes rigorous quality testing to ensure the best taste and nutrition." },
        { q: "What makes your product unique?", a: "We use only natural, high-quality ingredients without any artificial preservatives, ensuring you get the best nutrition in every serving." },
        { q: "What makes your product unique?", a: "Our protein formulations are scientifically designed to provide optimal absorption and sustained energy throughout your day." },
        { q: "What makes your product unique?", a: "All our products are shelf-stable, lactose-free, and recyclable, making them convenient and environmentally friendly." },
        { q: "What makes your product unique?", a: "We combine protein with caffeine for an extra energy boost, perfect for workouts or busy days." }
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="faq-container">
      <Navbar/>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .faq-container {
          background-color: #3a3a3a;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .navbar {
          background-color: #ffee00;
          padding: 20px 40px;
          color: #ffee00;
          font-size: 24px;
          font-weight: bold;
        }

        .heading {
          width: 100%;
          text-align: center;
          padding: 38px 20px 0;
        }

        .heading h1 {
          color: #ffee00;
          font-family: 'Khand', sans-serif;
          font-weight: bold;
          font-size: 60px;
          // text-transform: uppercase;
          // text-shadow: 2px 2px 0 #ffee00,
          //   -2px -2px 0 #ffee00,
          //   2px -2px 0 #ffee00,
          //   -2px 2px 0 #ffee00,
          //   2px 2px 0 #ffee00,
          //   -3px 0px 0 #ffee00,
          //   3px 0px 0 #ffee00,
          //   0px -3px 0 #ffee00,
          //   0px 3px 0 #ffee00;
          letter-spacing: 0;
          margin-bottom: 40px;
        }

        .category-title {
          color: #ffee00;
          font-family: 'Khand', sans-serif;
          text-transform: uppercase;
          // text-shadow: 2px 2px 0 #ffee00,
          //   -2px -2px 0 #ffee00,
          //   2px -2px 0 #ffee00,
          //   -2px 2px 0 #ffee00,
          //   2px 2px 0 #ffee00,
          //   -3px 0px 0 #ffee00,
          //   3px 0px 0 #ffee00,
          //   0px -3px 0 #ffee00,
          //   0px 3px 0 #ffee00;
          text-align: center;
          font-size: 28px;
          // padding: 60px 20px 30px;
          font-weight: bold;
        }

        .category-title:first-of-type {
          padding-top: 20px;
        }

        .box{
        width: 25%;
        height: 10vh;
        margin-left: 38%;
        margin-right: 30%;
        margin-top: 4%;
        background-color: #333333
        }

        .faq-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .faq-item {
          margin-bottom: 15px;
        }

        .faq-button {
          width: 100%;
          padding: 14px 50px 14px 20px;
          background-color: #ffee00;
          font-family: 'Khand', sans-serif;
          font-weight: bold;
          color: #2f2f2f;
          font-size: 23px;
          border: none;
          border-radius: 7px;
          position: relative;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .faq-button:hover {
          background-color: #ffd700;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .arrow {
          font-size: 30px;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 0.3s ease;
        }

        .arrow.open {
          transform: translateY(-50%) rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          background-color: rgb(255, 255, 255);
          border-radius: 0 0 7px 7px;
        }

        .faq-answer.open {
          max-height: 200px;
          padding: 20px;
          border: 2px solid #ffee00;
          border-top: none;
        }

        .faq-answer p {
          color: #0a0a0a;
          font-family: 'Khand', sans-serif;
          font-size: 18px;
          line-height: 1.6;
        }

        .cta-section {
          text-align: center;
          padding: 60px 20px;
        }

        .cta-title {
          color: #ffee00;
          font-family: 'Khand', sans-serif;
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .cta-button {
          background-color: #ffee00;
          color: #2f2f2f;
          font-family: 'Khand', sans-serif;
          font-size: 24px;
          font-weight: bold;
          padding: 15px 40px;
          border: none;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .cta-button:hover {
          background-color: #ffd700;
          transform: scale(1.05);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .heading h1 {
            font-size: 36px;
          }

          .category-title {
            font-size: 24px;
            padding: 40px 15px 20px;
          }

          .faq-section {
            padding: 0 15px;
          }

          .faq-button {
            font-size: 18px;
            padding: 12px 45px 12px 15px;
          }

          .arrow {
            font-size: 24px;
            right: 15px;
          }

          .faq-answer p {
            font-size: 16px;
          }

          .cta-title {
            font-size: 36px;
          }

          .cta-button {
            font-size: 20px;
            padding: 12px 30px;
          }
        }

        @media (max-width: 480px) {
          .heading h1 {
            font-size: 28px;
          }

          .category-title {
            font-size: 20px;
            padding: 30px 10px 15px;
            
          }

          .faq-button {
            font-size: 16px;
            padding: 10px 40px 10px 12px;
          }

          .arrow {
            font-size: 20px;
            right: 12px;
          }

          .faq-answer p {
            font-size: 14px;
          }

          .faq-answer.open {
            padding: 15px;
          }

          .cta-title {
            font-size: 28px;
          }

          .cta-button {
            font-size: 18px;
            padding: 10px 25px;
          }
        }
      `}</style>

      {/* <div className="navbar">LOGO</div> */}

      <div className="heading">
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
      </div>

      {faqData.map((category, catIndex) => (
        <div key={catIndex}>
          <div className="box">
          <h2 className="category-title">{category.category}</h2></div><br></br>
          <div className="faq-section">
            {category.questions.map((item, qIndex) => {
              const currentIndex = questionIndex++;
              return (
                <div key={qIndex} className="faq-item">
                  <button
                    className="faq-button"
                    onClick={() => toggleAccordion(currentIndex)}
                  >
                    {item.q}
                    <span className={`arrow ${openIndex === currentIndex ? 'open' : ''}`}>
                      ⌄
                    </span>
                  </button>
                  <div className={`faq-answer ${openIndex === currentIndex ? 'open' : ''}`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      

      <div className="cta-section">
        {/* <h2 className="cta-title">#GET IT NOW</h2> */}
        {/* <button className="cta-button">Shop Now</button> */}
        <Footer/>
      </div>
    </div>
  );
};

export default Faq;