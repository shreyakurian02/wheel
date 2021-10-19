import React, { useState } from "react";

import { Search, BurgerMenu } from "@bigbinary/neeto-icons";
import EmptyNotesListImage from "images/EmptyNotesList";
import { Button, Input, PageLoader } from "neetoui/v2";
import { Container, Header } from "neetoui/v2/layouts";

import EmptyState from "components/Common/EmptyState";
import NotesMenuBar from "components/Common/Navbar/Menubar";

import { INITIAL_NOTES } from "./Constants";
import DeleteAlert from "./DeleteAlert";
import NewNotePane from "./NewNotePane";
import NoteCard from "./NoteCard";

const Notes = () => {
  const [loading, setLoading] = useState(false);
  const [showNewNotePane, setShowNewNotePane] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const previousNotes = [...notes];
      const newnotes = previousNotes.filter(
        note => !selectedNoteIds.includes(note.id)
      );
      setNotes(newnotes);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const newNotes = async values => {
    values["id"] = notes.length + 1;
    setNotes([...notes, values]);
    setShowNewNotePane(false);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="flex w-full">
        {showMenuBar ? <NotesMenuBar /> : null}
        <Container>
          <Header
            className="px-3"
            actionBlock={
              <>
                <Input
                  placeholder="Search name, Email, Phone Number etc"
                  className="flex w-72 h-8 m-2"
                  size="small"
                  prefix={<Search size={16} />}
                />
                <Button
                  ClassName="mr-3 h-8"
                  label="Add Note +"
                  onClick={() => setShowNewNotePane(true)}
                />
              </>
            }
            menuBarHandle={
              <Button
                onClick={() => {
                  setShowMenuBar(showMenuBar => !showMenuBar);
                }}
                icon={function noRefCheck() {
                  return <BurgerMenu />;
                }}
                style="text"
              />
            }
            title="All Notes"
          />

          {notes.length ? (
            <>
              <NoteCard
                selectedNoteIds={selectedNoteIds}
                setSelectedNoteIds={setSelectedNoteIds}
                notes={notes}
                setShowDeleteAlert={setShowDeleteAlert}
              />
            </>
          ) : (
            <EmptyState
              image={EmptyNotesListImage}
              title="Looks like you don't have any notes!"
              subtitle="Add your notes to send customized emails to them."
              primaryAction={() => setShowNewNotePane(true)}
              primaryActionLabel="Add New Note"
            />
          )}
          <NewNotePane
            showPane={showNewNotePane}
            setShowPane={setShowNewNotePane}
            newNotes={newNotes}
          />
          {showDeleteAlert && (
            <DeleteAlert
              selectedNoteIds={selectedNoteIds}
              onClose={() => setShowDeleteAlert(false)}
              refetch={fetchNotes}
            />
          )}
        </Container>
      </div>
    </>
  );
};

export default Notes;
