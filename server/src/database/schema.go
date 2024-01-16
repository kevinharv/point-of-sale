package database

import "gorm.io/gorm"

type Region struct {
	gorm.Model
	Name string
	SiteGroups []SiteGroup
}

type SiteGroup struct {
	gorm.Model
	Name string
	RegionID uint
	Sites []Site
}

type Site struct {
	gorm.Model
	Name string
	Address string
	SiteGroupID uint
	TableGroups []TableGroup
	Servers []Server
	Workstations []Workstation
	Printers []Printer
	KDSes []KDS
	PaymentProcessors []PaymentProcessor
	Tickets []Ticket
}

type TableGroup struct {
	gorm.Model
	Name string
	SiteID uint
	Tables []Table
}

type Table struct {
	gorm.Model
	Name string
	TableGroupID uint
}

type Server struct {
	gorm.Model
	Name string
	Hostname string
	FQDN string
	IPAddress string
	Role string
	SiteID uint
}

type KDS struct {
	gorm.Model
	Name string
	Hostname string
	FQDN string
	IPAddress string
	Role string
	SiteID uint
}

type Workstation struct {
	gorm.Model
	Name string
	Hostname string
	FQDN string
	IPAddress string
	SiteID uint
}

type Printer struct {
	gorm.Model
	Name string
	Hostname string
	FQDN string
	IPAddress string
	SiteID uint
}

type PaymentProcessor struct {
	gorm.Model
	Name string
	SiteID uint
}

type Ticket struct {
	gorm.Model
	SiteID uint
}