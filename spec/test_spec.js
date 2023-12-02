/*This file contains Jasmine test cases */

const jasmine = require('jasmine');

const { averageRTT } = require('../hw6_partA');
const { server } = require('../hw6_partB_server');
const { client } = require('../hw6_partB_client');

const supertest = require('supertest');

describe("Application Server Tests:", function() {
    let count;
    beforeAll(function () {
        count = 0;
        server.close();
        server.listen(8080);
        console.log("\n=====================Executing Test Cases============================");
    });

    afterAll(function () {
        console.log("\n======================Execution Finished=============================");
        server.close();
    });

    beforeEach(function () {
        count++;
        console.log("\n---------------------------------------");
        console.log("Executing TC "+ count + ".");
    });

    afterEach(function () {
        console.log("\nFinished executing TC "+ count + ".");
        console.log("---------------------------------------");
    });

    it("Should return 415 for unsupported Content-Type.", async function() {
        await supertest(server)
        .post('')
        .send('Some Text')
        .set('Content-Type', 'application/pdf')
        .expect(415, 'Unsupported content type. Valid content-types are: application/json,text/plain,text/xml ');
    });

    it("Should return 405 for GET method.", async function() {
        await supertest(server)
        .get('')
        .expect(405, 'Invalid Method. Please use POST method.');
    });

    it("Should return 405 for PUT method.", async function() {
        await supertest(server)
        .put('')
        .expect(405, 'Invalid Method. Please use POST method.');
    });

    it("Should return 405 for DELETE method.", async function() {
        await supertest(server)
        .delete('')
        .expect(405, 'Invalid Method. Please use POST method.');
    });

    it("Should return 405 for PATCH method.", async function() {
        await supertest(server)
        .patch('')
        .expect(405, 'Invalid Method. Please use POST method.');
    });

    it("Should return 405 for OPTIONS method.", async function() {
        await supertest(server)
        .options('')
        .expect(405, 'Invalid Method. Please use POST method.');
    });

    it("Should return 200 for valid JSON Content-Type.", async function() {
        await supertest(server)
        .post('')
        .send('{"message": "Hello, World!"}')
        .set('Content-Type', 'application/json')
        .expect(200, '{"message":"Hello, World!"}');
    });

    it("Should return 400 for invalid JSON Content-Type.", async function() {
        await supertest(server)
        .post('')
        .send('Invalid JSON')
        .set('Content-Type', 'application/json')
        .expect(400, '"Bad Request, unable to parse request body."');
    });

    it("Should return 200 for text/plain Content-Type.", async function() {
        await supertest(server)
        .post('')
        .send('This is a sample plain text.')
        .set('Content-Type', 'text/plain')
        .expect(200, '"This is a sample plain text."');
    });

    const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<note>' +
    '<to>Tove</to>' +
    '<from>Jani</from>' +
    '<heading>Reminder</heading>' +
    '<body>Don\'t forget me this weekend!</body>' + 
    '</note>';

    it("Should return 200 for text/xml Content-Type.", async function() {
        await supertest(server)
        .post('')
        .send(xml)
        .set('Content-Type', 'text/plain')
        .expect(200);
    });
});