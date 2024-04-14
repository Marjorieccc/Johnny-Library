
<a name="readme-top"></a>

<div align="center">
  
  [![Contributors][contributors-shield]][contributors-url]
  [![Forks][forks-shield]][forks-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

</div>


<div align="center">
  <a href="https://github.com/Marjorieccc/LibraLounge">
    <img src="https://i.ibb.co/X2tr7hv/lib-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Johnny Library</h3>

  <p align="center">
    An online library allows you to reserve books and book study rooms
    <br />
    <a href="https://johnny-library.web.app/">View Demo</a>
    ·
    <a href="https://github.com/Marjorieccc/LibraLounge/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Marjorieccc/LibraLounge/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



## About The Project

TBC: screenshots

Welcome to our full-stack library management application. This project is designed to showcase our capabilities in handling both front-end and back-end development. It features basic functionalities including resource reservation for books and DVDs, and the ability to book study rooms based on date and available equipment. We've integrated user authentication using Auth0 and opted for MongoDB to manage and store data efficiently, ensuring a robust and scalable backend architecture.

😊 We warmly welcome any feedback or suggestions as we aim to further develop our skills and improve this application. 😊


**Key Features:**

- **User Authentication**: Secure account registration and login with Auth0.
- **Resource Management**: Offers a catalog of 399 diverse resources, including books and DVDs etc. Users can search for items by title, view detailed descriptions, and reserve resources. Each reservation is tracked and stored in the user's profile.
- **Room Booking System**: Features a dynamic room booking service that allows users to view available study rooms filtered by date and equipment. Users can book rooms for specific time periods.
- **Data Handling**: MongoDB for robust storage and handling of resources, users, rooms, and bookings data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

| Framework / Library   | Purpose |
| -------- | ------- |
| [![React][React.js]][React-url]  | Frontend library    |
| [![Tailwindcss][Tailwindcss]][Tailwindcss-url]  | Utility-first CSS framework   |
| [![Node.js][Node.js]][Node-url]  | Backend runtime environment   |
| [![Express.js][Express.js]][Express-url]  | Node.js web application framework   |
| [![MongoDB][Mongodb]][Mongodb-url]| NoSQL database   |
| [![Mongoose][Mongoose.js]][Mongoose-url]  | ODM for MongoDB and Node.js    |
| [![Auth0][Auth0]][Auth0-url]  | Authentication and authorization platform    |
| [![Docker][Docker]][Docker-url]  | Containerization platform   |
| [![Firebase][Firebase]][Firebase-url]  | Frontend hosting platform  |


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
### Getting Started 

To get a local copy of this project up and running, follow these steps:

1. **Clone the Repository**
   ```
   git clone https://github.com/Marjorieccc/LibraLounge.git
   ```

2. **Install Dependencies**

   Navigate to the project directory:
   ```
   cd LibraLounge
   ```
   
   Install backend dependencies:
   ```
   cd server
   npm install
   ```
   
   Install frontend dependencies:
   ```
   cd client
   npm install
   ```

3. **Set up MongoDB**

   This project uses MongoDB for data storage. For a local setup, install and start MongoDB following the [official guidelines](https://docs.mongodb.com/manual/installation/). Alternatively, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution, where you can create a cluster and follow   the setup instructions provided by Atlas.

4. **Set up Environment Variables**
   
   Create a `.env` file in the root directory of the server folder and add the following environment variables:
   ```
   MONGO_USERNAME = your-mongodb-username
   MONGO_PASSWORD = your-mongodb-password
   MONGO_DATABASE = your-mongodb-database
   MONGO_COLLECTION = your-mongodb-collection
   SERVER_PORT = 8080

   // TBC : auth0 config
   AUTH0_DOMAIN=your-auth0-domain
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_AUDIENCE=your-auth0-audience
   AUTH0_SCOPE=your-auth0-scope
   ```
   
   Replace the placeholders with your actual MongoDB URI and Auth0 credentials.

5. **Import Sample Data (Optional)**

   This project includes sample data that you can import into your MongoDB database to explore all features fully. You can access the sample data from [here](https://github.com/Marjorieccc/LibraLounge) (TBC: upload json)

   ```
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database --collection resources --file resources.json
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection resources_audience --file resources_audience.json
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection resources_categories --file resource_categories.json
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection resources_formats --file resources_formats.json
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection resources_languages --file resources_languages.json
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection rooms --file rooms.json	
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection rooms_sizes --file rooms_sizes.json	
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection equipments --file equipments.json
   mongoimport --db your-mongodb-username:your-mongodb-password@localhost:27017/your-database  --collection reservation --file reservation.json

   ```

   Replace your-mongodb-username, your-mongodb-password, localhost:27017, and your-database-name with the appropriate values based on your local or Atlas setup and import the Data into MongoDB.

6. **Start the Application**

   Navigate back to the root directory:
   ```
   cd ..
   ```
   
   Start the backend server:
   ```
   cd server
   npm start
   ```
   
   Start the frontend development server in a new terminal:
   ```
   cd client
   npm start
   ```

   The application should now be running locally at `http://localhost:3000`.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Visit [Johnny Library](https://johnny-library.web.app/) to explore the online library. The website is designed to be intuitive, allowing users to browse resources, reserve books, and book study rooms with ease.

**Features and Navigation**
* Resource Browsing: Users can search for resources using the search bar or browse through categories.
  * TBC: screen shots
    
* Reservations: To reserve resource, click on the item you are interested in and select the 'Reserve' option. You will need to be logged in to complete this action.
  * TBC: screen shots

* Room Booking: Access the room booking feature from the main menu. Here, you can view available rooms, check their equipment, select a date, and book a slot.
  * TBC: screen shots

* Account Page: The account page serves as a central hub for users to manage their personal information, view detailed records of reserved items, and review their room booking history.
  * TBC: screen shots

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [here][license-url] for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

* Dan WONG - [Email](mailto:wdwong13@gmail.com)  |  [Github](https://github.com/Dan-Wong56004)  |  [Linkedin](https://www.linkedin.com/in/danwongwt/)
* Johny CHUNG - [Email](mailto:wdwong13@gmail.com)  |  [Github](https://github.com/johnny-chung)  |  [Linkedin](https://www.linkedin.com/in/johnny-wychung/)
* Ken NG - [Email](mailto:wdwong13@gmail.com)  |  [Github](https://github.com/clng2022)  |  [Linkedin](https://www.linkedin.com/in/ken-clng/)
* Marjorie CHEUNG  - [Email](mailto:marjorie.cc.cheung@gmail.com)  |  [Github](https://github.com/Marjorieccc)  |  [Linkedin](https://www.linkedin.com/in/marjoriecheung/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Dataset from Arthur Koch](https://github.com/dudeonthehorse/datasets)
* [GitHub Pages](https://pages.github.com)
* [Img Shields](https://shields.io)
* [ImgBB](https://imgbb.com/)



<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/Marjorieccc/LibraLounge.svg?style=for-the-badge
[contributors-url]: https://github.com/Marjorieccc/LibraLounge/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Marjorieccc/LibraLounge.svg?style=for-the-badge
[forks-url]: https://github.com/Marjorieccc/LibraLounge/fork
[issues-shield]: https://img.shields.io/github/issues/Marjorieccc/LibraLounge.svg?style=for-the-badge
[issues-url]: https://github.com/Marjorieccc/LibraLounge/issues
[license-shield]: https://img.shields.io/github/license/Marjorieccc/LibraLounge?style=for-the-badge
[license-url]: https://github.com/Marjorieccc/LibraLounge/blob/beta/LICENSE
[Auth0]:https://img.shields.io/badge/auth0-EB5425?style=for-the-badge&logo=auth0&logoColor=white
[Auth0-url]: https://auth0.com/
[Docker]:https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]:https://www.docker.com/
[Express.js]:https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]:https://expressjs.com/
[Firebase]:https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[React.js]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[Node.js]:https://img.shields.io/badge/node.js-99CC7D?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]:https://nodejs.org/en
[Mongodb]: https://img.shields.io/badge/mongodb-00684A?style=for-the-badge&logo=mongodb&logoColor=white
[Mongodb-url]: https://www.mongodb.com/
[Mongoose.js]:https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]:https://mongoosejs.com/
[Tailwindcss-url]: https://tailwindcss.com/
[Tailwindcss]:https://img.shields.io/badge/tailwind%20css-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white

