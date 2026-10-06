const Transaction = require("../models/transaction");
const Category = require("../models/category");

 async function getAllTransactions (req, res){
    try {
      const {
        type,
        category,
        search,
        startDate,
        endDate,
        page = 1,
        limit = 10,
      } = req.query;

      const filter = {userId: req.user.id,};
 
      if (type) {
        filter.type = type;
      }

      if (category) {
        filter.category = category;
      }

      if (search) {
        filter.title = {
          $regex: search,
          $options: "i",
        };
      }


      // DATE FILTER
      if (startDate || endDate) {
        filter.date = {};

        if (startDate) {
          filter.date.$gte = new Date(startDate);
        }

        if (endDate) {
          const end = new Date(endDate);

          end.setHours(
            23,
            59,
            59,
            999
          );

          filter.date.$lte = end;
        }
      }


      // PAGINATION
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const skip =(pageNumber - 1) * limitNumber;


      // TRANSACTIONS
      const transactions =
        await Transaction.find(filter)
          .populate("category")
          .sort({ date: -1 })
          .skip(skip)
          .limit(limitNumber);


      // TOTAL
      const totalTransactions =
        await Transaction.countDocuments(
          filter
        );


      const totalPages =
        Math.ceil(
          totalTransactions /
          limitNumber
        );

      const categories =
        await Category.find({
          userId: req.user.id,
        });


      // SEND DATA TO EJS
      res.render(
        "transactions",
        {
          transactions,
          categories,

          page: pageNumber,
          limit: limitNumber,

          totalTransactions,
          totalPages,

          type: type || "",
          category: category || "",
          search: search || "",
          startDate: startDate || "",
          endDate: endDate || "",
        }
      );
    } catch (error) {
      console.log(error);

      res.status(500).send(
        "Error: " + error.message
      );
    }
  }
  // to show Transaction
   async function showTransaction (req, res) {
      try {
        const categories =
          await Category.find({
            userId: req.user.id,
          });
  
        res.render(
          "transaction-create",
          {
            categories,
          }
        );
      } catch (error) {
        res.status(500).send(
          "Error: " + error.message
        );
      }
   
    }
  //  to create transaction by page ejs

   async function createTransaction (req, res){
      try {
        const {
          title,
          amount,
          type,
          category,
          description,
          date,
        } = req.body;
  
  
        await Transaction.create({
          title,
          amount,
          type,
          category,
          description,
          date,
          userId: req.user.id,
        });
  
  
           res.redirect("/view/transactions");

      } catch (error) {
        res.status(500).send(
          "Error: " + error.message
        );
      }
    }


    // get one transaction 


     async  function getTransactionById (req, res) {
        try {
          const transaction =
            await Transaction.findOne({
              _id: req.params.id,
              userId: req.user.id,
            }).populate("category");
    
    
          if (!transaction) {
            return res.status(404).send(
              "Transaction not found"
            );
          }
    
    
          res.render(
            "transaction-detail",
            {
              transaction,
            }
          );
        } catch (error) {
          res.status(500).send(
            "Error: " + error.message
          );
        }
      }

      // get update Transaction

       async  function getUpdateTransactionById (req, res) {
          try {
            const transaction =
              await Transaction.findOne({
                _id: req.params.id,
                userId: req.user.id,
              });
      
      
            if (!transaction) {
              return res.status(404).send(
                "Transaction not found"
              );
            }
      
      
            const categories = await Category.find({ userId: req.user.id,   });
      
      
            res.render(
              "transaction-edit",
              {
                transaction,
                categories,
              }
            );
          } catch (error) {
            res.status(500).send(
              "Error: " + error.message
            );
          }
        }
  // crate updateTransaction  page 

    async function postUpdateTransactionById (req, res){
      try {
        const {
          title,
          amount,
          type,
          category,
          description,
          date,
        } = req.body;
  
  
        const transaction =
          await Transaction.findOneAndUpdate(
            {
              _id: req.params.id,
              userId: req.user.id,
            },
            {
              title,
              amount,
              type,
              category,
              description,
              date,
            },
            {
              new: true,
              runValidators: true,
            }
          );
  
  
        if (!transaction) {
          return res.status(404).send(
            "Transaction not found"
          );
        }
  
  
        res.redirect(
          `/view/transactions/${transaction._id}`
        );
      } catch (error) {
        res.status(500).send(
          "Error: " + error.message
        );
      }
    }


    /// delete transaction by page
     async function deleteTransactionById (req, res){
        try {
          const transaction =
            await Transaction.findOneAndDelete({
              _id: req.params.id,
              userId: req.user.id,
            });
    
    
          if (!transaction) {
            return res.status(404).send(
              "Transaction not found"
            );
          }
    
    
          res.redirect(
            "/view/transactions"
          );
        } catch (error) {
          res.status(500).send(
            "Error: " + error.message
          );
        }
      }

      module.exports={
        getAllTransactions,
        getTransactionById,
        getUpdateTransactionById,
        postUpdateTransactionById,
        deleteTransactionById,
        showTransaction,
        createTransaction
      }
