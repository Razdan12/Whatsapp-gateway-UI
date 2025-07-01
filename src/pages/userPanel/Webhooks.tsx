'use client';

import { use, useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Play,
} from 'lucide-react';
import webhookStore from '@/store/webhook.store';
import SessionStore from '@/store/session.store';
import Modal, { openModal } from '@/components/ui/Modal';
import Input from '@/components/ui/InputField';
import Select from '@/components/ui/Select';
import { EventData } from '@/data/event';
import { Methodes } from '@/data/metodhe';
import { SessionItem } from '@/midleware/session.api';

export default function WebhooksPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [triger, setTriger] = useState<boolean>(false);
  const [SessionItem, setSessionItem] = useState<SessionItem[]>([]);

  const { getAllWebhook, webhooks } = webhookStore();
  const { getAllSession, sessions } = SessionStore();

  useEffect(() => {
    const payload: string = `limit=${itemsPerPage}&page=${currentPage}&search=url:${search}`;
    getAllWebhook(payload);
  }, [itemsPerPage, currentPage, search, triger]);

  useEffect(() => {
    if (!sessions) {
      const payload: string = `limit=50&page=1`;
      getAllSession(payload);
    } 
  }, []);

  useEffect(() => {
    if (sessions) {
      setSessionItem(sessions.items);
    }
  }, [sessions]);
  console.log('sessions', SessionItem);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold ">WhatsApp Webhooks</h2>
          <p className="">
            Configure webhook endpoints to receive real-time WhatsApp events
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
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
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
            onClick={() => openModal('add-webhook')}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Webhook
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Events on
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {webhooks?.items.map((webhook) => (
                <tr key={webhook.id} className="hover:bg-base-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="">
                        <p className="font-bold">{webhook.method}</p>
                      </div>
                      <div>
                        <div className="text-sm  font-mono">{webhook.url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        webhook.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 '
                      }`}
                    >
                      {webhook.isActive ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {webhook.isActive === true ? 'Active' : 'Non Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {webhook.event}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded">
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

      <Modal id="add-webhook">
        <div>
          <p className="text-xl text-center w-full">Webhook</p>
          <div className="mt-5 flex flex-col gap-3">
            <div>
              <label htmlFor="">Account</label>
              <Select
                data={SessionItem}
                defaultValue="Account Whatsapp"
                placeholder="Select Event"
                className="grow"
                labelField="name"
                valueField="id"
                // error={errors.event?.message}
                // {...register("event")}
              />
            </div>
            <div>
              <label htmlFor="">URL</label>
              <Input
                type="text"
                className="grow"
                placeholder="URL"
                // error={errors.stock?.message}
                // {...register("stock")}
              />
            </div>
            <div>
              <label htmlFor="">Event Triger</label>
              <Select
                data={EventData}
                defaultValue="message"
                placeholder="Select Event"
                className="grow"
                labelField="value"
                valueField="key"
                // error={errors.event?.message}
                // {...register("event")}
              />
            </div>
            <div>
              <label htmlFor="">Methode</label>
              <Select
                data={Methodes}
                defaultValue="GET"
                placeholder="Select Methode"
                className="grow"
                labelField="value"
                valueField="key"
                // error={errors.method?.message}
                // {...register("method")}
              />
            </div>
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                // onClick={handleCreate}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white btn btn-ghost w-full rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
