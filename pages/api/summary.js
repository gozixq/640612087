export default function summaryRoute(req, res) {
  if (req.method === "GET") {

    //check authentication
    const user = checkToken(req);

    if (!user || !user.isAdmin){

      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
      
    //compute DB summary
    const users = readUsersDB();
    let User = 0;
    let Admin = 0;
    let Sum = 0;

    users.forEach((x) => { User++;
      if (x.isAdmin){
        Admin++;
        Sum = Sum + x.money;
      }
    });


    //return response
    return res.json({ ok: true,User ,Admin ,Sum });
  
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
