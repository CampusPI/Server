var Lab = require("lab"),
server = require("../../../");

Lab.test("Deve haver uma route para a root", function(done) {
  var options = {
    method: "GET",
    url: "/api/tv/broadcast"
  };

  server.inject(options, function(response) {
    var result = response.result;

    Lab.expect(response.statusCode).to.equal(200);
    Lab.expect(result).to.be.instanceof(Object);

    done();
  });
});
