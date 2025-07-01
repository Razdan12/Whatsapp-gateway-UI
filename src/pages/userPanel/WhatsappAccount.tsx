import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  QrCode,
  LogOut,
} from 'lucide-react';

import SessionStore from '@/store/session.store';
import { SessionItem } from '@/midleware/session.api';
import { BsWhatsapp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import Modal, { closeModal, openModal } from '@/components/ui/Modal';
import QRComponent from '@/components/QRComponen';

export default function WhatsappPage() {
  const {
    getAllSession,
    sessions,
    setIdSession,
    createSession,
    sessionId,
    session,
    deleteSessions,
    updateSessions
  } = SessionStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);
  const navigate = useNavigate();
  const [sessionName, setSessionName] = useState<string>('');

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=name:${search}`;
    getAllSession(payload);
  }, [itemsPerPage, currentPage, search, triger]);

  const handleClikk = (id: string) => {
    setIdSession(id);
    openModal('qr-wa');
  };

  const handleCreate = async () => {
    await createSession({ name: sessionName });
  };

  useEffect(() => {
    if (session) {
      closeModal('add-sessions');
      openModal('qr-wa');
    }
  }, [session]);

  const handleDelete = (id: string) => {
    deleteSessions(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold ">WhatsApp Accounts</h2>
          <p className="">
            Configure endpoints to receive real-time WhatsApp events
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search webhooks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                // value={selectedStatus}
                // onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => openModal('add-sessions')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </button>
        </div>
      </div>

      {/* Webhooks Table */}
      <div className="bg-base-100 rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Connection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {sessions?.items.map((item: SessionItem, index: number) => (
                <tr key={index} className="hover:bg-base-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                        <BsWhatsapp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium ">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === true
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status === true ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {item.status === true ? 'Online' : 'Offline'}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer tooltip ${
                        item.isActive === true
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.isActive === true ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {item.isActive === true ? 'Active' : 'Non Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-1">
                      <button
                        className="btn btn-sm btn-success btn-ghost text-green-500 hover:text-white tooltip"
                        data-tip="Status"
                        onClick={() => handleClikk(item.id || '')}
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-warning btn-ghost hover:text-white tooltip"
                        disabled={!item.status}
                        data-tip="Logout"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-primary btn-ghost text-blue-500 hover:text-white tooltip"
                        data-tip="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-sm btn-error btn-ghost text-red-500 hover:text-white tooltip"
                        data-tip="Delete"
                        onClick={() => handleDelete(item.id ?? '')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal id="add-sessions">
        <div>
          <p className="text-xl text-center w-full">Add Session</p>
          <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Session Name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Session 1"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
              />
              <p className="label">
                You can edit session name later on from settings
              </p>
            </fieldset>
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                onClick={handleCreate}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white btn btn-ghost w-full rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal id="qr-wa">
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <QRComponent sessionId={sessionId} />
        </div>
      </Modal>
    </div>
  );
}
