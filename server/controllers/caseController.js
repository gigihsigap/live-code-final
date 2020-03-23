const {Report, Country} = require('../models')

class Controller {

    static createReport(req, res, next) {
        console.log('Create report...')
        const obj = {
            cases: req.body.cases,
            CountryId: req.body.CountryId,
            UserId: req.userData.id
        }
        console.log(obj)
        const option = {where: { id: obj.CountryId}}
        Country.findOne(option)
        .then((countryData) => {
            console.log('Country reported:', countryData)
            countryData.cases += obj.cases
            Country.update(countryData, option)
                .then((newCountryData) => {
                    Report.create(obj)
                .then((data) => {
                    console.log('Created report:', data)
                    const report = {
                        id: data.id,
                        report: data.report,
                        CountryId: data.CountryId,
                        UserId: data.UserId,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        country: newCountryData,
                    }
                    res.status(201).json(report)
                })
                .catch(next)
            })
            .catch(next)
        })
        .catch(next)
    }

    static findAllCountries(req, res, next) {
        console.log('Find country')
        Country.findAll()
        .then((data) => res.status(200).json(data))
        .catch(next)
    }

    static findAllReports(req, res, next) {
        console.log('Find reports')
        Report.findAll()
        .then((report) => {
            if (report.length > 0) {
                console.log('Country ID:')
                console.log(report[0].CountryId)

                for (let i = 0; i < report.length; i++) {
                    Country.findOne({ where: { id: report[i].CountryId }})
                    .then((data) => {
                        report[i].country = data
                    })
                    .catch(next)
                }
                res.status(200).json(report)
                // Country.findOne({ where: { id: report.CountryId }})
                // .then((country) => {
                //     res.status(200).json({report, country})
                // })
                // .catch(next)
            } else {
                res.status(200).json({ message: 'No report data yet!' })
            }
        })
        .catch(next)
    }

    static deleteReport(req, res, next) {
        const option = { where: { id: req.params.id }}
        Report.findOne(option)
        .then(current => {
            if (current) {
                Country.findOne({ where: {id: current.CountryId}})
                .then(country => {
                    Country.update()
                    .then(newCountryData => {
                        Report.destroy(option)
                        .then((data) => res.status(200).json({
                            country: newCountryData,
                            report: 'Report successfully deleted'
                        }))
                        .catch(next)
                    })
                    .catch(next)
                })
                .catch(next)
                
            } else {
                throw { status: 404, message: 'Data not found!'}
            }
        })
        .catch(next)
    }
}

module.exports = Controller