DROP DATABASE IF EXISTS cdio;

CREATE DATABASE cdio;

USE cdio;
CREATE TABLE `Faculty` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NameFaculty` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Program` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NameProgram` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `OutcomeStandard` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NameOutcomeStandard` nvarchar(255) NOT NULL,
  `IdFaculty` INT NOT NULL,
  `IdProgram` INT NOT NULL,
  `IdUser` INT NOT NULL,
  `SchoolYear` nvarchar(255) NOT NULL,
  `DateCreated` DATETIME,
  `DateEdited` DATETIME,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `DetailOutcomeStandard` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdOutcomeStandard` INT NOT NULL,
  `KeyRow` nvarchar(255) NOT NULL,
  `NameRow` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Revision` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdOutcomeStandard` INT NOT NULL,
  `IdUser` INT NOT NULL,
  `NameRevision` nvarchar(255) NOT NULL,
  `DateUpdated` DATETIME,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `DetailRevision` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdRevision` INT NOT NULL,
  `KeyRow` nvarchar(255) NOT NULL,
  `NameRow` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `User` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `NameUser` nvarchar(255) NOT NULL,
  `Password` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Subject` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `SubjectCode` nvarchar(255) NOT NULL,
  `SubjectName` nvarchar(255) NOT NULL,
  `SubjectEngName` nvarchar(255) NOT NULL,
  `Credit` INT NOT NULL,
  `TheoryPeriod` INT NOT NULL,
  `PracticePeriod` INT NOT NULL,
  `ExercisePeriod` INT NOT NULL,
  `Description` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `SubjectEduProg` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdSubject` INT NOT NULL,
  `IdEduProg` INT NOT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Level` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `LevelName` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `EduProgram` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `EduName` nvarchar(255) NOT NULL,
  `EduEngName` nvarchar(255) NOT NULL,
  `IdLevel` INT NOT NULL,
  `IdMajor` INT NOT NULL,
  `IdProgram` INT NOT NULL,
  `SchoolYear` nvarchar(4) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `Major` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `MajorCode` nvarchar(255) NOT NULL,
  `MajorName` nvarchar(255) NOT NULL,
  `MajorEngName` nvarchar(255) NOT NULL,
  `IdFaculty` INT NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `EduPurpose` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdDetail` INT NOT NULL,
  `KeyRow` nvarchar(255) NOT NULL,
  `NameRow` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `DetailEduProgram` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdEduProgram` INT NOT NULL,
  `EnrollmentTarget` nvarchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `EduProgramContent` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `KeyRow` nvarchar(255) NOT NULL,
  `NameRow` nvarchar(255) NOT NULL,
  `Type` BOOLEAN NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `SubjectBlock` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdEduProgContent` INT NOT NULL,
  `Credit` INT NOT NULL,
  -- `isOptional` BOOLEAN NOT NULL,
  `isAccumulated` BOOLEAN NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `DetailBlock` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `IdSubjectBlock` INT NOT NULL,
  `IdSubject` INT NOT NULL,
  PRIMARY KEY (`Id`)
);

ALTER TABLE `OutcomeStandard` ADD CONSTRAINT `OutcomeStandard_fk0` FOREIGN KEY (`IdFaculty`) REFERENCES `Faculty`(`Id`);

ALTER TABLE `OutcomeStandard` ADD CONSTRAINT `OutcomeStandard_fk1` FOREIGN KEY (`IdProgram`) REFERENCES `Program`(`Id`);

ALTER TABLE `OutcomeStandard` ADD CONSTRAINT `OutcomeStandard_fk2` FOREIGN KEY (`IdUser`) REFERENCES `User`(`Id`);

ALTER TABLE `DetailOutcomeStandard` ADD CONSTRAINT `DetailOutcomeStandard_fk0` FOREIGN KEY (`IdOutcomeStandard`) REFERENCES `OutcomeStandard`(`Id`);

ALTER TABLE `Revision` ADD CONSTRAINT `Revision_fk0` FOREIGN KEY (`IdOutcomeStandard`) REFERENCES `OutcomeStandard`(`Id`);

ALTER TABLE `Revision` ADD CONSTRAINT `Revision_fk1` FOREIGN KEY (`IdUser`) REFERENCES `User`(`Id`);

ALTER TABLE `DetailRevision` ADD CONSTRAINT `DetailRevision_fk0` FOREIGN KEY (`IdRevision`) REFERENCES `Revision`(`Id`);

ALTER TABLE `SubjectEduProg` ADD CONSTRAINT `SubjectEduProg_fk0` FOREIGN KEY (`IdSubject`) REFERENCES `Subject`(`Id`);

ALTER TABLE `SubjectEduProg` ADD CONSTRAINT `SubjectEduProg_fk1` FOREIGN KEY (`IdEduProg`) REFERENCES `EduProgram`(`Id`);

ALTER TABLE `EduProgram` ADD CONSTRAINT `EduProgram_fk0` FOREIGN KEY (`IdLevel`) REFERENCES `Level`(`Id`);

ALTER TABLE `EduProgram` ADD CONSTRAINT `EduProgram_fk1` FOREIGN KEY (`IdMajor`) REFERENCES `Major`(`Id`);

ALTER TABLE `EduProgram` ADD CONSTRAINT `EduProgram_fk2` FOREIGN KEY (`IdProgram`) REFERENCES `Program`(`Id`);

ALTER TABLE `Major` ADD CONSTRAINT `Major_fk0` FOREIGN KEY (`IdFaculty`) REFERENCES `Faculty`(`Id`);

ALTER TABLE `EduPurpose` ADD CONSTRAINT `EduPurpose_fk0` FOREIGN KEY (`IdDetail`) REFERENCES `DetailEduProgram`(`Id`);

ALTER TABLE `DetailEduProgram` ADD CONSTRAINT `DetailEduProgram_fk0` FOREIGN KEY (`IdEduProgram`) REFERENCES `EduProgram`(`Id`);

ALTER TABLE `SubjectBlock` ADD CONSTRAINT `SubjectBlock_fk0` FOREIGN KEY (`IdEduProgContent`) REFERENCES `EduProgramContent`(`Id`);

ALTER TABLE `DetailBlock` ADD CONSTRAINT `DetailBlock_fk0` FOREIGN KEY (`IdSubjectBlock`) REFERENCES `SubjectBlock`(`Id`);

ALTER TABLE `DetailBlock` ADD CONSTRAINT `DetailBlock_fk1` FOREIGN KEY (`IdSubject`) REFERENCES `Subject`(`Id`);

